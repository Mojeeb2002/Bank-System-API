import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const register = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      // Extract name, email, password, and address from req.body
      const { name, email, password, address } = req.body;

      // Check if a user with the email already exists
      const existingUser = await User.findOne({ email }).session(session);

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "User with this email already exists!",
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        address,
      });

      // Save the user to the database
      await newUser.save({ session });

      res.status(201).json({
        success: true,
        message: "User created successfully!",
        data: newUser,
      });
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    next(error);
  } finally {
    session.endSession();
  }
};

export const login = async (req, res, next) => {
  try {
    // Extract email and password from req.body
    const { email, password } = req.body;

    // Check if a user with the email exists
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials!",
        });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        return res.status(401).json({
            success: false,
            message: "Invalid credentials!",
        });
    }

    // Generate a token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully!",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    next(error);
  }
};

export const logout = async (req, res, next) => {
    try {
        // Extract the token from the Authorization header

        
    } catch (error) {
        console.log(`Error: ${error.message}`);
        next(error);
    }
};
