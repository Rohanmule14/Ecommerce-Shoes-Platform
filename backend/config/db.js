import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbURL = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL, { useNewUrlParser: true });
    console.log("connected");
  } catch (error) {
    console.log("err: ", error);
  }
};

export default connectDB;
