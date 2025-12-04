import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContextt } from "../Context/AppContext";
import { IoEyeOff } from "react-icons/io5";//<IoEyeOff />
import { IoEye } from "react-icons/io5";//<IoEye />
export default function SignUp() {
  const [passwordShow,setPasswordShow] = useState(false);
  const navigate = useNavigate();
const {signUpData,setSignUpData,handleInputChange,handleSignUpSubmit,loader} = useContext(AppContextt);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleSignUpSubmit();
    if (success) navigate("/", { replace: true });
  };

  

  return (
    <div className="w-full min-h-screen bg-[#0084a8] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white shadow-xl rounded-2xl p-8 sm:p-10">

        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0084a8] tracking-wide mb-2">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">

          {/* Username */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              name="name"
              value={signUpData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full p-2 border border-gray-400 rounded-md text-gray-900 focus:ring-1 focus:ring-[#0084a8]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="text"
              name="email"
              value={signUpData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-400 rounded-md text-gray-900 focus:ring-1 focus:ring-[#0084a8]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <div className="w-full flex items-center px-1 border-2 border-gray-400 rounded-md ">
              <input
           
              type={passwordShow ? 'text':"password"}
              name="password"
              value={signUpData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="w-full p-2 flex-1  outline-none border-none text-gray-900 "
            />
            <span onClick={()=>setPasswordShow(!passwordShow)}>{passwordShow ?<IoEye className="h-5 w-5" />:<IoEyeOff className="h-5 w-5" /> }</span>
            </div>
            
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-[#0084a8] flex items-center justify-center text-white font-bold ${loader ? 'py-0':'py-2.5'} rounded-md hover:bg-[#007390] transition`}
          >
           {loader ? <span class="loader"></span> :"SignUp"}
          </button>
         
         

          {/* Already Account */}
          <div className="flex justify-center items-center gap-1 pt-2 text-sm">
            <span className="text-gray-700">Already have an account?</span>
            <NavLink
              to="/signin"
              className="text-[#0084a8] font-semibold hover:underline"
            >
              Sign In
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}
