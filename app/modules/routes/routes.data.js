import { DummyRouter } from "../user/user.routes.js";
import { Route, ExcludedRoute } from "./routes.types.js";

export const routes = [new Route("/dummy", DummyRouter)];

export const excludedRoutes = [new ExcludedRoute("/dummy/login", "POST")];
