import express from 'express';
import todoController from '../controller/todoController.js';  // Correct import

const router = express.Router();

// routes and controller
router.get('/', todoController.getAllTodos);
router.get('/:id', todoController.getTodoById);
router.post('/', todoController.addTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);
router.post('/:id/subtasks', todoController.addSubtask);
router.delete('/:id/subtasks/:subtaskIndex', todoController.deleteSubtask);

export default router;
