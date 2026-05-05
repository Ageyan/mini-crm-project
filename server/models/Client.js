import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
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
            transform: (_, obj) => {
                obj.id = obj._id;
                delete obj._id;
                return obj;
            },
        },
    },
);

const Client = mongoose.model('Client', userSchema);

export default Client;
