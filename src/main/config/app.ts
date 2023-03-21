import express from "express";
import setUpRoutes from "./route";
import setUpMiddleware from "./middleware";
import setupSwagger from "./config-swagger";

const app = express();

setupSwagger(app);
setUpMiddleware(app);
setUpRoutes(app);

export default app;
