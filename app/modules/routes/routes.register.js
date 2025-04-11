import { json } from "express";
import { excludedRoutes, routes } from "./routes.data.js";
import { ResponseHandler } from "../../utility/response-handler.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../config/swagger.js";
// import { authorization } from "../../utility/authorization.js";
import cors from "cors";
import { authorization } from "../../utility/auth.js";

export const registerRoutes = (app) => {
    app.use(cors());
    app.use(json());

    // Serve Swagger UI
    // serveSwaggerDocs(app);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use(authorization(excludedRoutes));

    for (let route of routes) {
        app.use(route.path, route.router);
    }

    app.use((error, req, res, _next) => {
        const statusCode = error.status || 500;
        res.status(statusCode).json(new ResponseHandler(false, statusCode, error.message || "Internal Server Error", null));
    });
};
