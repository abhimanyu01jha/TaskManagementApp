import express from 'express'

import { createTask,deleteTask,getUserTasks,updateTaskStatus } from '../controllers/taskController.js'
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/", authMiddleware, getUserTasks);
router.post("/", authMiddleware, createTask);
router.delete("/:id", authMiddleware, deleteTask);
router.patch("/:id/status", authMiddleware, updateTaskStatus);

export default router;