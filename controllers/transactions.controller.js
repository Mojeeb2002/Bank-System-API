import mongoose from "mongoose";
import Account from "../models/account.model.js";
import User from "../models/user.model.js";

export const deposit = async (req, res, next) => {
  try {
    // Extract amount from req.body and accountNumber from req.params
    const { amount, accountNumber } = req.body;

    // Find the account by accountNumber
    const account = await Account.findOne({
      accountNumber: accountNumber,
    });

    // Check if the account exists
    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found!",
      });
    }

    // Check if the user is the account owner
    const user = await User.findById(req.user._id);
    const accountUserId = account.user.toString();
    const userId = user._id.toString();

    if (accountUserId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to withdraw from this account!",
      });
    }

    // Update the account balance
    account.balance += amount;
    await account.save();

    const result = {
      accountNumber: account.accountNumber,
      balance: account.balance,
      currency: account.currency,
    };

    res.status(200).json(result);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    next(error);
  }
};

export const withdraw = async (req, res, next) => {
  try {
    // Extract amount from req.body and accountNumber from req.params
    const { amount, accountNumber } = req.body;

    // Find the account by accountNumber
    const account = await Account.findOne({
      accountNumber: accountNumber,
    });

    // Check if the account exists
    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found!",
      });
    }

    // Check if the user is the account owner
    const user = await User.findById(req.user._id);
    const accountUserId = account.user.toString();
    const userId = user._id.toString();

    if (accountUserId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to withdraw from this account!",
      });
    }

    // Check if the account has sufficient balance
    if (account.balance < amount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient balance!",
      });
    }

    // Update the account balance
    account.balance -= amount;
    await account.save();

    const result = {
      accountNumber: account.accountNumber,
      balance: account.balance,
      currency: account.currency,
    };

    res.status(200).json(result);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    next(error);
  }
};

export const transfer = async (req, res, next) => {
  try {
    const { amount, accountNumber, recipientAccountNumber } = req.body;

    const senderAccount = await Account.findOne({
      accountNumber: accountNumber,
    }).populate("user", "name");
    const recipientAccount = await Account.findOne({
      accountNumber: recipientAccountNumber,
    }).populate("user", "name");

    if (!senderAccount || !recipientAccount) {
      return res.status(404).json({
        success: false,
        message: "Account not found!",
      });
    }

    const user = await User.findById(req.user._id);
    const senderAccountUserId = senderAccount.user._id.toString();
    const userId = user._id.toString();

    if (senderAccountUserId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to transfer from this account!",
      });
    }

    // Check if accounts are the same currency
    if (senderAccount.currency !== recipientAccount.currency) {
      return res.status(400).json({
        success: false,
        message: "Accounts are not the same currency!",
      });
    }

    // Check if the account has sufficient balance
    if (senderAccount.balance < amount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient balance!",
      });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    senderAccount.balance -= amount;
    recipientAccount.balance += amount;

    await senderAccount.save({ session });
    await recipientAccount.save({ session });

    await session.commitTransaction();
    session.endSession();

    const receipt = {
      From: {
        Name: senderAccount.user.name,
        AccountNumber: senderAccount.accountNumber,
        Amount: amount,
      },
      To: {
        Name: recipientAccount.user.name,
        AccountNumber: recipientAccount.accountNumber,
        Amount: amount,
      },
      Currency: senderAccount.currency,
    };

    res.status(200).json(receipt);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    next(error);
  }
};
