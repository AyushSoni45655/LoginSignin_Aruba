import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export const AppContextt = createContext();

export const ContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // TOKEN STATE
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // USER STATE
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : {};    // always object
  });

  const [loader,setLoader] = useState(false);
  // SIGNUP FORM STATE
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // INPUT CHANGE HANDLER
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }));
  };

  // SIGNUP SUBMIT
  const handleSignUpSubmit = async () => {
    try {
      setLoader(true);
      const response = await axios.post(
        `${backendUrl}/user/api/signup`,
        signUpData     
      );

      if (response.data.success) {
        const userData = response.data.user;
        const userToken = response.data.token;

        // SAVE TOKEN IN STATE + LOCALSTORAGE
        setToken(userToken);
        localStorage.setItem("token", userToken);

        // SAVE USER IN STATE + LOCALSTORAGE
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        toast.success("SignUp Completed");
        return true;
      }
    } catch (error) {
      toast.error(`SignUp Error: ${error.response?.data?.msg || "Server error"}`);
      return false;
    }
    finally{
      setLoader(false);
    }
  };


  // login functionality here implemented

  const [loginData, setLoginData] = useState({
      email: "",
      password: "",
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setLoginData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleLogin = async () => {
      try {
        setLoader(true);
         const response = await axios.post(
        `${backendUrl}/user/api/signin`,
        loginData      
      );

      if (response.data.success) {
        const userData = response.data.user;
        const userToken = response.data.token;

        // SAVE TOKEN IN STATE + LOCALSTORAGE
        setToken(userToken);
        localStorage.setItem("token", userToken);

        // SAVE USER IN STATE + LOCALSTORAGE
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        toast.success("SignIn Completed");
        return true;
      }
        
      } catch (error) {
        toast.error(`Login Error : ${error.response?.data?.msg}`)
        return false;
      }finally{
        setLoader(false);
      }
    };

  const values = {
    token,
    setToken,
    user,
    loader,
    loginData,setLoginData,handleChange,handleLogin,
    signUpData,
    setSignUpData,
    handleInputChange,
    handleSignUpSubmit,
  };

  return <AppContextt.Provider value={values}>{children}</AppContextt.Provider>;
};
