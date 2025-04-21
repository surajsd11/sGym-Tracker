import express from "express";
import Workout from "../models/Workout.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

//Get all workouts for logged-in user
router.get("/", async (req, res) => {
  const { user } = req.query;
  if (!user) {
    return res.status(400).json({ message: "Username is required" });
  }
  const workouts = await Workout.find({ username: user }).sort({ date: -1 });
  res.json(workouts);
});



//Create a new workout
router.post("/", protect, async (req, res) => {
  try {
    const {
      workoutType,
      maxWeight,
      minWeight,
      exerciseName,
      date,
      username
    } = req.body;

    const newWorkout = new Workout({
      workoutType,
      maxWeight,
      minWeight,
      exerciseName,
      date: date || new Date(),
      username,
      userId: req.user._id,
    });

    await newWorkout.save();
    res.status(201).json(newWorkout);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to create workout" });
  }
});

// Update a workout
router.put('/:id', async (req, res) => {
  try {
    const { username } = req.body;
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    if (workout.username !== username) {
      return res.status(403).json({ message: 'Not authorized to update this workout' });
    }

    const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updatedWorkout);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to update workout' });
  }
});


// Delete a workout
router.delete("/:id", async (req, res) => {
  const { username } = req.body;
  const workout = await Workout.findOneAndDelete({ _id: req.params.id, username });
  if (!workout) {
    return res.status(404).json({ message: "Workout not found or unauthorized" });
  }
  res.json({ message: "Workout deleted" });
});

router.delete('/user/:username', async (req, res) => {
  try {
    const username = req.params.username;
    await Workout.deleteMany({ username });
    res.status(200).json({ message: "All workouts for user deleted." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete workouts." });
  }
});


export default router;
