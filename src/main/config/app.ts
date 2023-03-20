import express from "express";
import setUpRoutes from "./route";
import setUpMiddleware from "./middleware";

const app = express();

setUpMiddleware(app);
setUpRoutes(app);

export default app;
