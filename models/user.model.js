import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters long"],
      maxLength: [100, "Name must be at most 50 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      trim: true,
      unique: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Please enter a valid email address!",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minLength: [6, "Password must be at least 6 characters!"],
      maxLength: [100, "Password must be at most 50 characters!"],
    },
    address: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
