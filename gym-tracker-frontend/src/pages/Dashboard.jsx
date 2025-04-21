import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import WorkoutCard from "../components/WorkoutCard";
import WorkoutForm from "../components/WorkoutForm";
import { logout } from "../utils/auth";

const Dashboard = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const fetchWorkouts = async () => {
    try {
      const query = username ? `?user=${encodeURIComponent(username)}` : '';
      const { data } = await API.get(`/workouts${query}`);
      setWorkouts(data);
    } catch (error) {
      console.error("Failed to fetch workouts:", error);
    }
  };

  const handleSubmit = async (form) => {
    try {
      if (selectedWorkout) {
        await API.put(`/workouts/${selectedWorkout._id}`, { ...form, username });
      } else {
        await API.post("/workouts", { ...form, username });
      }
      setSelectedWorkout(null);
      fetchWorkouts();
    } catch (error) {
      console.error("Workout submit error:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this workout?")) {
      try {
        await API.delete(`/workouts/${id}`, { data: { username } });
        fetchWorkouts();
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  useEffect(() => {
    if (username) {
      fetchWorkouts();
    }
  }, [username]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-300 to-pink-200 px-4 py-10 font-sans">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Hey, {username || "User"} 👋
          </h1>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow"
          >
            Logout
          </button>
        </div>

        {/* Workout Form */}
        <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-xl">
          <p className="text-xl font-semibold text-gray-800 mb-4">
            ✍️ Add Your Workout Routine
          </p>
          <WorkoutForm
            onSubmit={handleSubmit}
            selectedWorkout={selectedWorkout}
            cancelEdit={() => setSelectedWorkout(null)}
          />
        </div>

        {/* Workout Cards */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🏋️ Your Workouts
          </h2>
          {workouts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {workouts.map((workout) => (
                <div
                  key={workout._id}
                  className="bg-white/70 backdrop-blur-md p-4 rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-transform"
                >
                  <WorkoutCard
                    workout={workout}
                    onEdit={setSelectedWorkout}
                    onDelete={handleDelete}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-lg text-gray-800">No workouts yet. Add one!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
