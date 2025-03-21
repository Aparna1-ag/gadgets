import mongoose from "mongoose";
import { configDotenv } from "dotenv";


configDotenv()

const mongoURI = process.env.MONGO_URI

export const connecttoDB = async () => {
  try {
    await mongoose.connect(mongoURI)
       console.log("Connected to the MongoDB Database, Yayyy!!")
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err)
    process.exit(1)
  }
}



// connecttoDB()
