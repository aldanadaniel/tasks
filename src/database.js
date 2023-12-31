import mysql from "mysql2/promise";
import { config as dotenv } from "dotenv";
dotenv();

export const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "tasksdb",
    port: process.env.DB_PORT,
    uri: process.env.DB_URI
})