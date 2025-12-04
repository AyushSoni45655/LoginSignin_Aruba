import React, { useContext, useEffect } from "react";
import { AppContextt } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const Home = () => {
  const { user, setToken, token } = useContext(AppContextt);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");  // token empty -> user logged out
  };

  useEffect(() => {
    if (!token) {
      navigate("/signin", { replace: true });
    }
  }, [token]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0084a8] via-[#0aa4c4] to-[#0dc6e4] flex flex-col items-center px-4 py-8">

      {/* Header */}
      <div className="w-full max-w-3xl flex items-center justify-between bg-white/20 backdrop-blur-md shadow-lg p-4 rounded-xl border border-white/30">
        <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide">
          Welcome
        </h1>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-white text-[#0084a8] font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
        >
          <FiLogOut size={18} />
          Logout
        </button>
      </div>

      {/* Card Section */}
      <div className="mt-10 w-full max-w-lg bg-white shadow-2xl rounded-2xl p-6 sm:p-8 text-center">

        <div className="flex justify-center mb-4">
          <FaUserCircle size={80} className="text-gray-500" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800">
          {user?.name || "User Name"}
        </h2>

        <p className="text-gray-600 text-md mt-1">
          {user?.email || "user@example.com"}
        </p>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 gap-4">
          <div className="bg-[#0084a8] text-white p-4 rounded-xl shadow hover:scale-105 transition cursor-pointer">
            <h3 className="text-lg font-semibold">Your Profile</h3>
          </div>

          <div className="bg-[#00a1c6] text-white p-4 rounded-xl shadow hover:scale-105 transition cursor-pointer">
            <h3 className="text-lg font-semibold">Settings</h3>
          </div>

          <div className="bg-[#00bfdc] text-white p-4 rounded-xl shadow hover:scale-105 transition cursor-pointer">
            <h3 className="text-lg font-semibold">My Activity</h3>
          </div>

          <div className="bg-[#04d4ee] text-white p-4 rounded-xl shadow hover:scale-105 transition cursor-pointer">
            <h3 className="text-lg font-semibold">Support</h3>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Home;
