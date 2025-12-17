import "dotenv/config";

export const {
  APP_PORT,
  DB_COLLECTION_STRING,
  ACCESS_SECRET = "",
  ACCESS_EXPIRY = "1d",
  REFRESH_SECRET = "",
  REFRESH_EXPIRY = "10d",
  REFRESH_TOKEN = "",
} = process.env || {};
