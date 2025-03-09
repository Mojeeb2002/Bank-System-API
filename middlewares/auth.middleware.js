import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";

// Middleware to authorize user
export const authorize = async (req, res, next) => {
  try {
    let token;

    // Check if token is provided in the Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // If no token found, send unauthorized response
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this route",
      });
    }

    // Verify token using JWT_SECRET
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find the user associated with the token
    const user = await User.findById(decoded.userId);

    // If user not found, send unauthorized response
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this route",
      });
    }

    // Attach the user to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Authorization error:", error.message);
    res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to access this route only admins can",
    });
  }
  next();
};
