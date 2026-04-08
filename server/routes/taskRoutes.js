import express from 'express';
import * as taskController from '../controllers/taskController.js'

const router = express.Router();

router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTask);

export default router;