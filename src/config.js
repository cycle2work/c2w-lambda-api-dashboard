import dotenv from "dotenv";

dotenv.config();

export const LOG_LEVEL = process.env.LOG_LEVEL || "debug";

export const PROCESSED_ACTIVITIES_COLLECTION =
  process.env.PROCESSED_ACTIVITIES_COLLECTION || "processed-activities";

export const MONGODB_NAME = process.env.MONGODB_NAME || "test";
export const MONGODB_URL =
  process.env.NODE_ENV === "test"
    ? "mongodb://localhost:27017/test?retryWrites=true&w=majority"
    : process.env.MONGODB_URL;
