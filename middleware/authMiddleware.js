import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';

dotenv.config();

const auth = async(req, res, next) => {
    try{ 

        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({ message : "user not athonticated, token missing"});
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById( decode.id ).select("-password");//this line for exclude the password

        if(!user){
            res.status(401).json({ message : "user not found"});
        }

        req.user = user;
        next();
    }catch(err){
        res.status(401).json({message : err.message })
    }

}

export default auth