import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI; // env.local file mein URI hona chahiye

if (!MONGO_URI) {
  throw new Error("Please define MONGO_URI in .env.local");
}

let isConnected = false; // global check

const connectDB = async () => {
  if (isConnected) {
    console.log("=> Already connected to MongoDB.");
    return;
  }

  try {
    const db = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "event-booking-system", // optional: aapka DB name
    });

    isConnected = true;
    console.log("✅ MongoDB Connected:", db.connection.host);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};

export default connectDB;
