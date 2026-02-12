import Task from '../models/task.js';

export const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        const task = await Task.create({
            title,
            description,    
            user : req.user._id
        });

        const populatedTask = await task.populate('user',   "name email role");
        res.status(201).json({ message: "task created", task : populatedTask });
    }catch(err){
        res.status(500).json({ message : err.message });
    }
};

export const getTasks = async(req, res) => {
    try{
        let tasks
        if(req.user.role === 'admin'){
           tasks = await Task.find().populate('user', 'name email role');
        }else{
            tasks = await Task.find({user: req.user._id }).populate('user', 'name email role')
        }
        
        res.status(200).json( tasks );
    }catch(err){
        res.status(500).json({ message : err.message });
    }
}

export const getTask = async(req, res) => {
    try{
        const task = await Task.findById( req.params.id ).populate("user", "name email role");

        if(req.user.role !== "admin" && task.user._id.toString() !== req.user._id.toString()){
            res.status(403).json({ message :"not authorize user"})
        }
        res.status(200).json(task);
    }catch(err){
        res.status(500).json({ message : err.message })
    }
}

export const updateTask = async(req, res) => {
    try{
        let task = await Task.findById(req.params.id);

        if(req.user.role !== "admin" && req.user._id.toString() !== task.user._id.toString()){
            res.status(403).json({ message : "not authorize to edit this task"})
        }
        Object.assign(task, req.body);
        await task.save();

        res.status(200).json({ message: "Task updated", task });
    }catch(err){
        res.status(500).json({ message : err.message })
    }
}

export const deleteTask = async(req, res) => {
    try{
        let task = await Task.findById(req.params.id);

        if(req.user.role !== "admin" && req.user._id.toString() !== task.user._id.toString()){
            res.status(403).json({ message : "not authorize to delete this task"});
        }
        await task.deleteOne();

        res.status(200).json({ message: "Task delted", task });
    }catch(err){
        res.status(500).json({ message : err.message });
    }
}







