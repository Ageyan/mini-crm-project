import type { Request, Response } from 'express';

import { errorHandler } from '../utils/errorHandler.js';

import Task from '../models/Task.js';

export const createTask = async (req: Request , res: Response) => {
    try {
        const { title, clientId } = req.body;

        const taskObj = {
            title,
            clientId,
        };

        const task = await Task.create(taskObj);

        const populatedTask = await task.populate('clientId');

        return res.status(201).json(populatedTask);
    } catch (err) {
        errorHandler(err, res, 'to create the task');
    }
};

export const updateTask = async (req: Request , res: Response) => {
    try {
        const taskId = req.params.id;

        const task = await Task.findByIdAndUpdate(taskId, req.body, {
            new: true,
            runValidators: true,
        }).populate('clientId');

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(200).json(task);
    } catch (err) {
        errorHandler(err, res, 'to update the task');
    }
};

export const deleteTask = async (req: Request , res: Response) => {
    try {
        const taskId = req.params.id;

        const task = await Task.findByIdAndDelete(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        errorHandler(err, res, 'to delete the task');
    }
};

export const getTasks = async (req: Request , res: Response) => {
    try {
        const tasks = await Task.find().populate('clientId');

        return res.status(200).json(tasks);
    } catch (err) {
        errorHandler(err, res, 'to fetch tasks');
    }
};

export const getTask = async (req: Request , res: Response) => {
    try {
        const taskId = req.params.id;

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(200).json(task);
    } catch (err) {
        errorHandler(err, res, 'to finding task');
    }
};
