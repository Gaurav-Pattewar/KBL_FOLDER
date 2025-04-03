import { json } from "express";
import { excludedRoutes, routes } from "./routes.data.js";
import { ResponseHandler } from "../../utility/response-handler.js";
// import { authorization } from "../../utility/authorization.js";
import cors from "cors";

export const registerRoutes = (app) => {
    app.use(cors());
    app.use(json());

    // app.use(authorization(excludedRoutes));

    for (let route of routes) {
        app.use(route.path, route.router);
    }

    app.use((error, req, res, next) => {
       
        const statusCode = error.status || 500;
        res.status(statusCode).json(new ResponseHandler(false, statusCode, error.message || "Internal Server Error", null));
    });
};
