import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/login", login);

authRouter.post("/register", register);

authRouter.post("/logout", authRouter,logout);

export default authRouter;
