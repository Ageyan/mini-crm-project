import mongoose from 'mongoose';

const taskSchema = mongoose.Schema(
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
    },
    {
        timestamps: true,
        toJSON: {
            transform: (_, obj) => {
                obj.id = obj._id;
                delete obj._id;
                return obj;
            },
        },
    },
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
