import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });


export const { PORT, MONGO_URI, JWT_EXPIRES_IN, JWT_SECRET } = process.env;

