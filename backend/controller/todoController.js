import Todo from '../models/todoModal.js';  

// Controllers

// Get all todos
const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find().sort({ order: 1 });
        res.json(todos);
    } catch (err) {
        console.error('Error fetching todos:', err);
        res.status(500).json({ message: 'Server error while fetching todos' });
    }
};

// Get a single todo 
const getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json(todo);
    } catch (err) {
        console.error('Error fetching todo:', err);
        res.status(500).json({ message: 'Server error while fetching todo' });
    }
};

//  new todo
const addTodo = async (req, res) => {
    const { title, subtasks = [], order } = req.body;
    if (!title || order === undefined) {
        return res.status(400).json({ message: 'Title and order are required' });
    }
    try {
        const newTodo = new Todo({ title, subtasks, order });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        console.error('Error adding todo:', err);
        res.status(500).json({ message: 'Server error while adding todo' });
    }
};

// Update  todo
const updateTodo = async (req, res) => {
    const { title, subtasks } = req.body;
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { title, subtasks },
            { new: true }
        );
        if (!updatedTodo) return res.status(404).json({ message: 'Todo not found' });
        res.json(updatedTodo);
    } catch (err) {
        console.error('Error updating todo:', err);
        res.status(500).json({ message: 'Server error while updating todo' });
    }
};

// Delete  todo
const deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) return res.status(404).json({ message: 'Todo not found' });
        res.json({ message: 'Todo deleted successfully', todo: deletedTodo });
    } catch (err) {
        console.error('Error deleting todo:', err);
        res.status(500).json({ message: 'Server error while deleting todo' });
    }
};

// Add a subtask
const addSubtask = async (req, res) => {
    const { subtask } = req.body;
    if (!subtask) return res.status(400).json({ message: 'Subtask is required' });

    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });

        todo.subtasks.push(subtask);
        await todo.save();
        res.json(todo);
    } catch (err) {
        console.error('Error adding subtask:', err);
        res.status(500).json({ message: 'Server error while adding subtask' });
    }
};

// Delete a subtask
const deleteSubtask = async (req, res) => {
    const { subtaskIndex } = req.params;
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });

        if (subtaskIndex < 0 || subtaskIndex >= todo.subtasks.length) {
            return res.status(400).json({ message: 'Invalid subtask index' });
        }

        todo.subtasks.splice(subtaskIndex, 1);
        await todo.save();
        res.json(todo);
    } catch (err) {
        console.error('Error deleting subtask:', err);
        res.status(500).json({ message: 'Server error while deleting subtask' });
    }
};

// export all functions t
export default {
    getAllTodos,getTodoById,addTodo,updateTodo,deleteTodo,addSubtask,deleteSubtask,
};
