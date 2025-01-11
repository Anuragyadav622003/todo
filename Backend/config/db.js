import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true, // Still required to handle modern connection strings
    });
    console.log("MongoDB connection established");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
  }
};

export default connectDB;
