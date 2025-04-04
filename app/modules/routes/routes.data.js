import { AuthRouter } from "../auth/auth.controller.js";
import { UserRouter } from "../user/user.controller.js";
import { Route, ExcludedRoute } from "./routes.types.js";

export const routes = [
  new Route("/user", UserRouter),
  new Route("/auth", AuthRouter),
];

export const excludedRoutes = [
  new ExcludedRoute("/auth/login", "POST"),
  new ExcludedRoute("/auth/signup", "POST"),
];
