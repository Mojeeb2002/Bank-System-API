import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  deposit,
  withdraw,
  transfer,
} from "../controllers/transactions.controller.js";

const transactionRouter = Router();

transactionRouter.post("/deposit", authorize, deposit);
transactionRouter.post("/withdraw", authorize, withdraw);
transactionRouter.post("/transfer", authorize, transfer);

export default transactionRouter;
