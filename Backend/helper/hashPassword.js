import bcrypt from "bcrypt";

 const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10); // direct saltRounds pass करो
  } catch (error) {
    console.error(`Error hashing password: ${error.message}`);
    throw new Error("Password hashing failed");
  }
};

export default hashPassword;