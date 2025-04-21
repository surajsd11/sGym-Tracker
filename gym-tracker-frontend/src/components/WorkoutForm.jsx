import React from "react";
import { useState, useEffect } from "react";

const WorkoutForm = ({ onSubmit, selectedWorkout, cancelEdit }) => {
  const [form, setForm] = useState({
    workoutType: "biceps",
    maxWeight: "",
    minWeight: "",
    exerciseName: "",
  });

  useEffect(() => {
    if (selectedWorkout) {
      setForm(selectedWorkout);
    }
  }, [selectedWorkout]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      workoutType: "biceps",
      maxWeight: "",
      minWeight: "",
      exerciseName: "",
    });
  };

  // Emoji Selection

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 mb-6 rounded-xl shadow-md"
    >
      <div className="flex flex-col md:flex-row gap-4">
        {/* Workout Type */}
        <select
          name="workoutType"
          value={form.workoutType}
          onChange={handleChange}
          className="p-2 border rounded w-full md:w-1/3"
        >
          <option value="biceps">Biceps</option>
          <option value="triceps">Triceps</option>
          <option value="back">Back</option>
          <option value="chest">Chest</option>
          <option value="shoulder">Shoulder</option>
          <option value="leg">Leg</option>
        </select>

        {/* Max Weight */}
        <input
          type="number"
          name="maxWeight"
          value={form.maxWeight}
          onChange={handleChange}
          placeholder="Max Weight"
          className="p-2 border rounded w-full md:w-1/3"
        />

        {/* Min Weight */}
        <input
          type="number"
          name="minWeight"
          value={form.minWeight}
          onChange={handleChange}
          placeholder="Min Weight"
          className="p-2 border rounded w-full md:w-1/3"
        />

        {/* Exercise Name */}
        <input
          type="text"
          name="exerciseName"
          value={form.exerciseName}
          onChange={handleChange}
          placeholder="Exercise Name"
          className="p-2 border rounded w-full md:w-1/3"
        />

      </div>

      <div className="mt-4 flex gap-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {selectedWorkout ? "Update" : "Add"} Workout
        </button>
        {selectedWorkout && (
          <button
            type="button"
            onClick={cancelEdit}
            className="text-red-600 hover:underline"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default WorkoutForm;
