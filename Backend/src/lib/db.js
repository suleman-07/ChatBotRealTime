import mongose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected"); 
    }
    catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1);
    }
};

export { connectDB };