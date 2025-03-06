import mongoose from "mongoose";


const mongoURI = "mongodb+srv://StereoDevv:MongoExpress%401@gadgets.ivgae.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=gadgets"

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
