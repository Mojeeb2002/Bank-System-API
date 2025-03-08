import mongoose from "mongoose";
import { MONGO_URI } from "../config/env.js";


if (!MONGO_URI) {
  throw new Error("Mongo URI is missing");
}

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB successfully");
        
    } catch (error) {
        console.error("Error connecting to MongoDB", error.message);
        process.exit(1);
    }
};

export default connectToMongoDB;