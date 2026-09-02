import mongoose, { Schema } from "mongoose";

import type { IAdmin } from "../types/admin.types.js";

const adminSchema = new Schema<IAdmin>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true, 
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform: (_, ret: Record<string, any>) => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                delete ret.password; 
                return ret;
            },
        },
    }
)

const Admin = mongoose.model<IAdmin>('Admin', adminSchema);

export default Admin;