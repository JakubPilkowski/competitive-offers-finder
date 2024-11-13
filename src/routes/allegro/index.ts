import express from "express";
import offerRouter from "./offer";
import categoriesRouter from "./categories";
import authRouter from "./auth";

const allegroRouter = express.Router();

const routeName = "/allegro";

const routes = [authRouter, categoriesRouter, offerRouter];

routes.forEach((route) => {
  allegroRouter.use(routeName, route);
});

export default allegroRouter;
