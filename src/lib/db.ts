import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!

if (!MONGODB_URL) {
    throw new Error("MONGODB_URL must be provided in env file")
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            maxPoolSize: 10,
        }

        cached.promise = mongoose.connect(MONGODB_URL, opts)
            .then(() => mongoose.connection)
            
    }
    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.conn = null    
    }
    
    return cached.conn
}