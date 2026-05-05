import Task from '../models/Task.js';

export const createTask = async (req, res) => {
    try {
        const { title, clientId } = req.body;

        const taskObj = {
            title,
            clientId,
        };

        const task = await Task.create(taskObj);

        const populatedTask = await task.populate('clientId');

        return res.status(201).json(populatedTask);
    } catch (e) {
        res.status(400).json({ message: 'Failed to create the task' });
    }
};

export const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        const task = await Task.findByIdAndUpdate(taskId, req.body, {
            new: true,
            runValidators: true,
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(200).json(task);
    } catch (e) {
        res.status(400).json({ message: 'Failed to update the task' });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        const task = await Task.findByIdAndDelete(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (e) {
        res.status(400).json({ message: 'Failed to delete the task' });
    }
};

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate('clientId');

        return res.status(200).json(tasks);
    } catch (e) {
        res.status(400).json({ message: 'Failed to fetch tasks' });
    }
};

export const getTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(200).json(task);
    } catch (e) {
        res.status(400).json({ message: 'Failed to found the task' });
    }
};
