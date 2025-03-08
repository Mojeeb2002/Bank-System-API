import mongoose from "mongoose";
import Account from "../models/account.model.js";
import User from "../models/user.model.js";

export const createAccount = async (req, res, next) => {
  try {
    const account = await Account.create({ ...req.body, user: req.user._id });
    res.status(201).json({
      success: true,
      message: "Account created successfully!",
      data: account,
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    next(error);
  }
};

export const getAccounts = async (req, res, next) => {
  try {
    const accounts = await Account.find({ user: req.user._id }) // Filter by logged-in user
      .populate("user", "name") // Populate the user field with only the name
      .select("accountNumber balance currency"); // Select only the required fields

    if (accounts && accounts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "You don't have any accounts!",
      });
    }

    const result = accounts.map((account) => ({
      name: account.user.name,
      accountNumber: account.accountNumber,
      balance: account.balance,
      currency: account.currency,
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
