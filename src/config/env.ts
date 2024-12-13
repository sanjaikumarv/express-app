import "dotenv/config";

export const appPort = process.env.APP_PORT || 1000

export const dbConnectionString = process.env.DATABASE_CONNECTION_STRING || ""

export const jwtSecret = process.env.JWT_SECRET || ""
export const jwtExpiry = process.env.JWT_EXPIRY || ""


