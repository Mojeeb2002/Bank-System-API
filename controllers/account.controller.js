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

export const getUserAccounts = async (req, res, next) => {
  try {
    // Find the user by id
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    // Find all accounts that belong to the user
    const accounts = await Account.find({ user: req.params.id })
      .populate("user", "name")
      .select("accountNumber balance currency");

    if (accounts && accounts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User does not have any accounts!",
      });
    }

    const result = accounts.map((account) => ({
      name: user.name,
      accountNumber: account.accountNumber,
      balance: account.balance,
      currency: account.currency,
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error);
  }
};

export const getAccount = async (req, res, next) => {
  try {
    const account = await Account.findById(req.params.id).populate(
      "user",
      "name"
    );

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found!",
      });
    }

    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error);
  }
};
