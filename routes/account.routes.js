import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.js";
import {
  createAccount,
  getAccounts,
} from "../controllers/account.controller.js";

const accountRouter = Router();

accountRouter.post("/create-account", authorize, createAccount);
accountRouter.get("/", authorize, getAccounts);

export default accountRouter;
