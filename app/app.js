import express from "express";
import { registerRoutes } from "./modules/routes/routes.register.js";
import { AppDataSource } from "./config/connection.js";

export const startServer = () => {
  console.log("Starting server...");
  const app = express();

  registerRoutes(app);

  // eslint-disable-next-line no-undef
  const { PORT } = process.env;

  AppDataSource.initialize()
    .then(() => {
      console.log("MSSQL connected with TypeORM");
      app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error("Database connection error:", err);
    });
};
