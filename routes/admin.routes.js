import { Router } from "express";
import { authorize, isAdmin } from "../middlewares/auth.middleware.js";
import { getUser } from "../controllers/user.controller.js";
import { getAccount, getUserAccounts } from "../controllers/account.controller.js";

const adminRouter = Router();

adminRouter.get("/user/:id", authorize, isAdmin, getUser);
adminRouter.get("/user/accounts/:id", authorize, isAdmin, getUserAccounts);
adminRouter.get("/account/:id", authorize, isAdmin, getAccount);

export default adminRouter;
