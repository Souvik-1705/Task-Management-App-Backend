import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { addTask, deleteTask, getTask, toggleTask, updateTask } from '../controllers/taskController.js';

const router=express.Router();

router.get("/",protect,getTask);
router.post("/",protect,addTask);
router.put("/:id",protect,updateTask);
router.patch("/:id",toggleTask);
router.delete("/:id",deleteTask);

export default router;