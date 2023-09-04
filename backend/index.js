import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./routes/authRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;
connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/auth", router);

app.listen(port, () => {
  console.log("Server started at port 5000....");
});
