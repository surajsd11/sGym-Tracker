import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FaTrashAlt } from 'react-icons/fa';
import API from '../api/axios'

const HomePage = () => {
  const [username, setUsername] = useState('');
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('userList')) || [];
    setUserList(storedUsers);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = username.trim();
    if (trimmedName) {
      const updatedUserList = [...new Set([...userList, trimmedName])];
      setUserList(updatedUserList);
      localStorage.setItem('userList', JSON.stringify(updatedUserList));
      navigate(`/dashboard/${encodeURIComponent(trimmedName)}`);
    }
  };

  const handleBoxClick = (name) => {
    navigate(`/dashboard/${encodeURIComponent(name)}`);
  };

  const handleDelete = async (name) => {
    try {
      // Delete user data from backend
      await API.delete(`/workouts/user/${encodeURIComponent(name)}`);
  
      // Remove user from localStorage
      const updatedUserList = userList.filter((user) => user !== name);
      setUserList(updatedUserList);
      localStorage.setItem('userList', JSON.stringify(updatedUserList));
    } catch (error) {
      console.error('Error deleting user and data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-300 to-pink-200 px-4 py-10 font-sans">
      <Navbar />

      <div className="max-w-2xl mx-auto mt-10">
        {/* Form Box */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/70 backdrop-blur-md shadow-xl rounded-2xl p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Enter Your Name 👤
          </h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your name"
            className="w-full px-4 py-3 mb-4 rounded-xl bg-white/90 border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition"
          >
            Go to Dashboard
          </button>
        </form>

        {/* Existing Users */}
        {userList.length > 0 && (
          <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">Existing Users</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userList.map((name) => (
                <div
                  key={name}
                  onClick={() => handleBoxClick(name)}
                  className="cursor-pointer bg-white/80 hover:bg-purple-100 transition p-4 rounded-xl shadow flex justify-between items-center"
                >
                  <span className="font-medium text-gray-700">{name}</span>
                  <FaTrashAlt
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(name);
                    }}
                    className="text-red-500 hover:text-red-600 transition cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
