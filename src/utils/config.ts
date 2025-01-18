import dotenv from "dotenv";
dotenv.config();

export const PORT = Number(process.env.PORT) || 8000;
export const DB_HOST = process.env.DB_HOST || "127.0.0.1";
export const DB_PORT = Number(process.env.DB_PORT) || undefined;
export const DB_USER = process.env.DB_USER || "root";
export const DB_NAME = process.env.DB_NAME || "mydb";
export const DB_PASSWORD = process.env.DB_PASSWORD || "";
export const EXECUTABLE = process.env.EXECUTABLE || "/usr/bin/google-chrome";
export const INTERVEL = Number(process.env.INTERVEL) || 5;
