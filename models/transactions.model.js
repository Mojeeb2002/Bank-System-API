import mongoose from "mongoose";


const transactionSchema = new mongoose.Schema({
    transactionName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    fromAccount: {
        type: String,
        required: true,
    },
    toAccount: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    time: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;