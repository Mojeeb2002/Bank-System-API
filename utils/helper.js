import dotenv from "dotenv";
dotenv.config({ path: "../.env.development.local" });
import axios from "axios";

export const convertCurrency = async (from, to, amount) => {
  try {
    // Ensure environment variables are correctly imported
    if (!process.env.CURRENCY_API_KEY || !process.env.CURRENCY_API_URL) {
      throw new Error("Missing API key or URL");
    }

    const url = `${process.env.CURRENCY_API_URL}?apikey=${process.env.CURRENCY_API_KEY}`;

    // Fetch exchange rates
    const { data } = await axios.get(url);

    // Ensure data structure is correct
    if (!data || !data.data) {
      throw new Error("Invalid API response");
    }

    const rates = data.data;

    // Validate currencies
    if (!rates[from] || !rates[to]) {
      throw new Error(`Invalid currency code: ${from} or ${to}`);
    }

    // Convert currency: directly get conversion rate
    const conversionRate = rates[to] / rates[from];
    const convertedAmount = amount * conversionRate;

    return convertedAmount.toFixed(2);
  } catch (error) {
    console.error("Currency conversion error:", error.message);
    return null;
  }
};


