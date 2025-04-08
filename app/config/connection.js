import { DataSource } from "typeorm";
import "reflect-metadata";
import { User } from "../modules/user/user.schema.js";
import dotenv from "dotenv";
dotenv.config();

// eslint-disable-next-line no-undef
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

export const AppDataSource = new DataSource({
  type: "mssql",                                 
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),                  // SQL Server default port is 1433
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User],
  options: {
    encrypt: false,                            //  False for Local development or trusted networks
    enableArithAbort: true,                    //  Prevent silent failures on math errors
  },
});