import mongoose, { Schema } from 'mongoose';

import type { ITask } from '../types/taks.types.js';

const taskSchema = new Schema<ITask>(
    {
        title: {
            type: String,
            required: true,
        },
        clientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Client',
        },
        status: {
            type: String,
            enum: ['todo', 'in-progress', 'done'],
            default: 'todo',
        },
        description: {
            type: String,
            default: ''
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform: (_, ret: Record<string, any>) => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        },
    },
);

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;
