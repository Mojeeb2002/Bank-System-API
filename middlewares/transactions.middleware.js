import { saveTransaction } from "../utils/transactions.save.js";

// Middleware to save the transaction
export const saveTransactionMiddleware = async (req, res, next) => {
  try {
    // Ensure the request body is not empty
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body is empty",
      });
    }

    // Extract transaction details from the request body
    const { fromAccount, toAccount, amount } = req.body;

    // Ensure all required fields are present
    if (!fromAccount || !toAccount || !amount) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields (fromAccount, toAccount, amount)",
      });
    }

    // Log the contents of req.body for debugging


    // Get the transaction name (assuming it's coming from the route path or as part of the request)
    const transactionName = req.path.split("/")[1]; // Example: "/deposit" -> "deposit"

    // Save the transaction
    const transaction = await saveTransaction(
      transactionName,
      req.user.name, // userName
      fromAccount,
      toAccount,
      amount
    );

    // If saving the transaction fails
    if (!transaction) {
      return res.status(500).json({
        success: false,
        message: "Error logging transaction",
      });
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Transaction logging error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error logging transaction",
    });
  }
};
