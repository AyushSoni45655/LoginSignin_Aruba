import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,          
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      lowercase: true,     
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,         
    },
  },

  {
    timestamps: true,       
  }
);

const UserModel =
  mongoose.models.User || mongoose.model("User", userSchema, "users");

export default UserModel;
