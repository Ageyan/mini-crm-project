import mongoose, { Schema } from 'mongoose';

import type { IClient } from '../types/client.types.js';

const clietnSchema = new Schema<IClient>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
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

const Client = mongoose.model<IClient>('Client', clietnSchema);

export default Client;
