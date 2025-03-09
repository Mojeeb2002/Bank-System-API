import Transaction from "../models/transactions.model.js";

export const saveTransaction = async (
  transactionName,
  userName, // Ensure the field name matches the schema
  fromAccount,
  toAccount,
  amount
) => {
  try {
    const transaction = new Transaction({
      transactionName,
      userName, // Ensure the field name matches the schema
      fromAccount,
      toAccount,
      amount,
      date: new Date(),
    });

    await transaction.save();
    return transaction;
  } catch (error) {
    console.error("Transaction save error:", error.message);
    return null;
  }
};
