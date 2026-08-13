import mongoose from "mongoose";

const adminSchema = mongoose.Schema(
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
            transform: (_, obj) => {
                obj.id = obj._id;
                delete obj._id;
                delete obj.password; 
                return obj;
            },
        },
    }
)

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;