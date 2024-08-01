import { Env } from "../utils";
import { DataSource } from "typeorm";

// Edit this
export const datasource = new DataSource({
    type: "mysql",
    host: Env.DB_HOST,
    port: Env.DB_PORT,
    database: Env.DB_NAME,
    username: Env.DB_USER,
    password: Env.DB_PASS,
    entities: [__dirname + "/entities/*.entity{.ts,.js}"],
    migrations: [__dirname + "/migrations/*{.ts,.js}"]
});