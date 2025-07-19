import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Please define MONGO_URI in your environment variables");
}

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("✅ Already connected to MongoDB");
    return;
  }

  try {
    const connection = await mongoose.connect(MONGO_URI, {
      dbName: "event-booking-system",
    });

    isConnected = true;
    console.log("✅ MongoDB Connected:", connection.connection.host);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
};

export default connectDB;
