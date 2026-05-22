import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoute.js";
import cors from "cors";
dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", process.env.ADMIN_URL],
    credentials: true,
  })
);

app.use("/api", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
