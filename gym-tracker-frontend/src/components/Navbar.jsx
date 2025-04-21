import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from "../utils/auth";


const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white/70 backdrop-blur-md shadow-md py-4 px-6 flex justify-between items-center w-full">
    <h1 className="text-2xl font-bold text-purple-600">SGym Tracker</h1>
    <button
      onClick={logout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
    >
      Logout
    </button>
  </nav>
  );
};

export default Navbar;
