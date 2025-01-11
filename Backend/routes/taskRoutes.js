import express from 'express';
import { createTask, deleteTask, getTasks, shareTask, updateTask } from '../controllers/taskController.js';
const router = express.Router();
router.post('/',createTask);
router.get('/',getTasks);
router.put('/:id',updateTask);
router.delete('/:id',deleteTask);
router.post(':id/share',shareTask);
export default router;