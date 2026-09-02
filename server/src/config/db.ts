import mongoose from 'mongoose';
import 'dotenv/config';

const URI = process.env.MONGO_URI as string;

if (!URI) {
    throw new Error(
        'Please define the MONGO_URI environment variable inside .env',
    );
}

declare global {
    var mongoose: {
        conn: typeof import('mongoose') | null;
        promise: Promise<typeof import('mongoose')> | null;
    };
}

let cached  = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false, 
        };

        cached.promise = mongoose.connect(URI, opts).then(mongooseInstance => {
            console.log('=> New MongoDB connection established');
            return mongooseInstance;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        console.error('=> MongoDB connection error:', e);
        throw e;
    }

    return cached.conn;
}

export default connectDB;
