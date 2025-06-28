import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://bilalbilaliqbal25:eventbooKINGx100@cluster0.micwjbp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

if (!MONGO_URI) {
  throw new Error("Please define MONGO_URI");
}

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("✅ Already connected");
    return;
  }

  try {
    // ✅ FIXED — assign result of connect
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
