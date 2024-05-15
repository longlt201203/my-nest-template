import { config } from "dotenv";

config();

export class Env {
    static readonly LISTEN_PORT = parseInt(process.env.LISTEN_PORT || "3000");
    
    static readonly DB_HOST = process.env.DB_HOST || "localhost";
    static readonly DB_PORT = parseInt(process.env.DB_PORT || "");
    static readonly DB_NAME = process.env.DB_NAME || "";
    static readonly DB_USER = process.env.DB_USER || "";
    static readonly DB_PASS = process.env.DB_PASS || "";
}