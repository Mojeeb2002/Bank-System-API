import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.js"; // Authorization middleware
import { saveTransactionMiddleware } from "../middlewares/transactions.middleware.js"; // Transaction logging middleware
import {
  deposit,
  withdraw,
  transfer,
  exchange,
} from "../controllers/transactions.controller.js";

const transactionRouter = Router();

// Deposit route
transactionRouter.post(
  "/deposit",
  (req, res, next) => {
    // Ensure `fromAccount` and `toAccount` are set correctly for a deposit
    req.body.fromAccount = req.body.accountNumber; // fromAccount for deposit
    req.body.toAccount = req.body.accountNumber; // toAccount for deposit
    next();
  },
  authorize, // First, authorize the user
  saveTransactionMiddleware, // Then, save the transaction
  deposit // Finally, process the deposit
);

// Withdraw route
transactionRouter.post(
  "/withdraw",
  (req, res, next) => {
    // Ensure `fromAccount` and `toAccount` are set correctly for a withdrawal
    req.body.fromAccount = req.body.accountNumber; // fromAccount for withdrawal
    req.body.toAccount = req.body.accountNumber; // toAccount for withdrawal
    next();
  },
  authorize, // First, authorize the user
  saveTransactionMiddleware, // Then, save the transaction
  withdraw // Finally, process the withdrawal
);

// Transfer route
transactionRouter.post(
  "/transfer",
  authorize, // First, authorize the user
  saveTransactionMiddleware, // Then, save the transaction
  transfer // Finally, process the transfer
);

// Exchange route
transactionRouter.post(
  "/exchange",
  authorize, // First, authorize the user
  saveTransactionMiddleware, // Then, save the transaction
  exchange // Finally, process the exchange
);

export default transactionRouter;
