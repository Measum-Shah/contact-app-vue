import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);

        console.log(" MongoDB connected:");
        console.log(`🔹 Database: ${connect.connection.name}`);
        console.log(`🔹 Host: ${connect.connection.host}`);
        console.log(`🔹 Port: ${connect.connection.port}`);
    } catch (error) {
        console.error(" MongoDB connection error:", error);
    }
};

export default connectDB;
