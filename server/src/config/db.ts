import mongoose from 'mongoose';
import 'dotenv/config';

const URI = process.env.MONGO_URI as string;

if (!URI) {
    throw new Error(
        'Please define the MONGO_URI environment variable inside .env',
    );
}

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(URI);
        console.log(`=> MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('=> MongoDB connection error:', error);
        process.exit(1); 
    }
};

export default connectDB;
