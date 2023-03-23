import dotenv from "dotenv";
dotenv.config();

export default {
  // Environment
  PORT: process.env.PORT || 3000,
  ENVIRONMENT: process.env.ENVIRONMENT,

  // EXTERNAL-API
  API_CURRENCY: process.env.API_CURRENCY,
  LOCAL_CURRENCY: process.env.LOCAL_CURRENCY,
  ALTERNATIVE_CURRENCY: process.env.ALTERNATIVE_CURRENCY,

  // Database
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
};
