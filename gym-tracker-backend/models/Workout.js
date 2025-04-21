import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  workoutType: {
    type: String,
    enum: ["biceps", "triceps", "back", "chest", "leg", "shoulder"],
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },  
  minWeight: { type: Number, required: true },
  maxWeight: { type: Number, required: true },
  exerciseName: {type: String, required: true},
  date: { type: Date, default: Date.now },
  username: { type: String, required: true },
});

const Workout = mongoose.model("Workout", workoutSchema);
export default Workout;
