import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  accountNumber: {
    type: String,
    unique: true,
    trim: true,
    immutable: true, // Make the field immutable
  },
  balance: {
    type: Number,
    default: 0,
  },
  currency: {
    type: String,
    default: "USD",
    enum: ["USD", "EUR", "GBP"],
  },

}, { timestamps: true});

// Pre-save hook to generate a 9-digit unique account number
accountSchema.pre("save", async function (next) {
  if (this.isNew) {
    let unique = false;
    while (!unique) {
      const randomNumber = Math.floor(
        100000000 + Math.random() * 900000000
      ).toString();
      const existingAccount = await mongoose.models.Account.findOne({
        accountNumber: randomNumber,
      });
      if (!existingAccount) {
        this.accountNumber = randomNumber;
        unique = true;
      }
    }
  }
  next();
});

const Account = mongoose.model("Account", accountSchema);

export default Account;
