import mongoose from "mongoose";

type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface ITask { 
    title: string;
    clientId: mongoose.Types.ObjectId;
    status: TaskStatus;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
}