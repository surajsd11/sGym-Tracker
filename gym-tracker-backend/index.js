import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import workoutRoutes from "./routes/workoutRoutes.js";
import userRoutes from "./routes/userRoutes.js"

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes); 
app.use("/api/workouts", workoutRoutes);

const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => console.error("Connection error:", err));
