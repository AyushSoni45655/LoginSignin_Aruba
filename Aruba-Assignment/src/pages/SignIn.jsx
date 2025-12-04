

import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { AppContextt } from "../Context/AppContext";

export default function SignIn() {
  const [passwordShow, setPasswordShow] = useState(false);
  const navigate = useNavigate();

  const { loginData, handleChange, handleLogin, loader } =
    useContext(AppContextt);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleLogin();
    if (success) navigate("/", { replace: true });
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0084a8] via-[#00aacc] to-[#00d4ff] flex items-center justify-center px-5 py-10">

      {/* Glass Card */}
      <div className="w-full max-w-sm backdrop-blur-2xl bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-8 animate-fadeIn">

        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-white text-center drop-shadow-lg tracking-wide">
          Welcome Back 👋
        </h2>
        <p className="text-center text-white/90 font-medium mt-1">
          Login to your dashboard
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          
          {/* Email */}
          <div>
            <label className="block text-white font-semibold mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 rounded-xl bg-white/90 border border-white/50 text-gray-900 
              focus:border-[#00b1d4] focus:ring-2 focus:ring-[#0097b3] outline-none transition-all duration-300"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-white font-semibold mb-1">
              Password
            </label>

            <div className="flex items-center bg-white/90 border border-white/50 rounded-xl px-3">
              <input
                type={passwordShow ? "text" : "password"}
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full p-3 bg-transparent outline-none text-gray-900"
              />

              <span
                onClick={() => setPasswordShow(!passwordShow)}
                className="cursor-pointer text-gray-700"
              >
                {passwordShow ? (
                  <IoEye className="h-6 w-6" />
                ) : (
                  <IoEyeOff className="h-6 w-6" />
                )}
              </span>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className={`w-full mt-3 bg-white text-[#0084a8] font-bold text-lg tracking-wide 
            rounded-xl shadow-xl transition-all duration-300 
            hover:scale-[1.02] hover:bg-gray-200 active:scale-95
            ${loader ? "py-2" : "py-3"}`}
          >
            {loader ? <span className="loader"></span> : "Sign In"}
          </button>

          {/* Signup */}
          <div className="text-center pt-2 text-white/90 text-sm">
            Don't have an account?{" "}
            <NavLink
              to="/signup"
              className="font-semibold underline hover:text-white"
            >
              Sign Up
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}
