import React from "react";
import {
  GiBiceps,          // flexed upper‑arm (biceps) :contentReference[oaicite:6]{index=6}
  GiArm,             // entire arm (triceps/forearm) :contentReference[oaicite:7]{index=7}
  GiMuscularTorso,   // chest + shoulder :contentReference[oaicite:8]{index=8}
  GiLeg,             // upper/lower leg :contentReference[oaicite:9]{index=9}
  GiBackPain         // back (pain indicator) :contentReference[oaicite:10]{index=10}
} from 'react-icons/gi';
const iconMap = {
  biceps: <GiBiceps />,
  triceps: <GiArm />,
  back: <GiBackPain />,
  chest: <GiMuscularTorso />,
  leg: <GiLeg />,
  shoulder: <GiMuscularTorso />,
};

const WorkoutCard = ({ workout, onEdit, onDelete }) => {
  const icon = iconMap[workout.workoutType] || <GiBiceps />;

  return (
    <div className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center mb-3">
      <div>
        <span className="text-3xl">{icon}</span>
        <h1 className="text-3xl text-pink-600 font-semibold capitalize">{workout.personName}</h1>
        <h3 className="text-xl font-semibold capitalize">{workout.workoutType} -- <span>{workout.exerciseName}</span></h3>
        <p>Max Weight: {workout.maxWeight} kg</p>
        <p>Min Weight: {workout.minWeight} kg</p>
        <p className="text-sm text-gray-600">{new Date(workout.date).toLocaleDateString()}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(workout)}
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(workout._id)}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default WorkoutCard;
