import express from "express";
import { PORT } from "./config/env.js";
import connectToMongoDB from "./database/mongobd.js";
import authRouter from "./routes/auth.routes.js";
import accountRouter from "./routes/account.routes.js";
import transactionRouter from "./routes/transactions.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/bank", authRouter);
app.use("/bank/account", accountRouter);
app.use("/bank/transactions", transactionRouter);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToMongoDB();
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `Port ${PORT} is already in use. Please use a different port.`
    );
    process.exit(1);
  } else {
    throw err;
  }
});

export default app;
