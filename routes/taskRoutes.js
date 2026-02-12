import { createTask, getTasks, getTask, updateTask, deleteTask } from '../controller/taskController.js';
import express from 'express';
const router = express.Router();
import auth from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js"

router.post('/', auth, createTask);

router.get('/', auth, getTasks);

router.get('/:id',auth , getTask);

router.put('/:id',auth , updateTask);

router.delete('/:id',auth , deleteTask);

export default router;