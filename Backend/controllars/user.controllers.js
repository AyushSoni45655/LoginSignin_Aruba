

import hashPassword from "../helper/hashPassword.js";

import UserModel from "../modal/user.modal.js";
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const createToken = (id)=>{
return jwt.sign({id}, process.env.JWT_SECRET_KEY,{expiresIn:'1d'});
}
const signIn = async(req,res)=>{
  try{
      const { email, password } = req.body;

    // 🟢 Empty Field Check
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "All fields are required" });
    }

    // 🟢 Email Validation
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid email format" });
    }

    

      // 🟢 Check Email Already Exists
    const existedUser = await UserModel.findOne({ email });
    if (!existedUser) {
      return res.status(400).json({
        success: false,
        msg: "User Not found",
      });
    }
    const comparingPassword = await bcrypt.compare(password, existedUser.password);
      if (!comparingPassword) {
      return res.status(400).json({
        success: false,
        msg: "Invalid Password",
      });
    }
    const safeUser = existedUser.toObject();
    delete safeUser.password;
    const token = createToken(existedUser._id);

     return res.status(200).json({
      success: true,
      msg: "SignIn Successful",
      token,
      user: safeUser,
    });

  }catch(error){
       console.error("Signin Error:", error.message);
    return res
      .status(500)
      .json({ success: false, msg: "Something went wrong on the server" });
  }
}

 const signUp = async (req, res) => {
  try {
    const { email, password,  name } = req.body;

    // 🟢 Empty Field Check
    if (!email || !password  || !name) {
      return res
        .status(400)
        .json({ success: false, msg: "All fields are required" });
    }

    // 🟢 Email Validation
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid email format" });
    }

  

    // 🟢 Check Email Already Exists
    const existedUser = await UserModel.findOne({ email });
    if (existedUser) {
      return res.status(400).json({
        success: false,
        msg: "User already registered with this email",
      });
    }

   

    // 🟢 Password Strength Check
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        msg: "Password must be at least 8 characters",
      });
    }

    // 🟢 Hash Password
    const hashPass = await hashPassword(password);

    // 🟢 Create User
    const newUser = await UserModel.create({
      name,
      email,
      password: hashPass,
    });

    // 🟢 Create Token
    const token = createToken(newUser._id);

    // 🟢 Remove password before sending response
    const safeUser = newUser.toObject();
    delete safeUser.password;

    return res.status(201).json({
      success: true,
      msg: "SignUp Successful",
      token,
      user: safeUser,
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    return res
      .status(500)
      .json({ success: false, msg: "Something went wrong on the server" });
  }
};



export {
  signIn,signUp
}