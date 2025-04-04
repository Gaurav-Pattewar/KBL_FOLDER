import { UserRouter } from "../user/user.routes.js";
import { Route, ExcludedRoute } from "./routes.types.js";

export const routes = [new Route("/user", UserRouter)];

export const excludedRoutes = [new ExcludedRoute("/dummy/login", "POST")];
