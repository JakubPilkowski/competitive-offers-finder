import express from "express";
import productsRouter from "./products";

const ecatRouter = express.Router();

const routeName = "/ecat";

const routes = [productsRouter];

routes.forEach((route) => {
  ecatRouter.use(routeName, route);
});

export default ecatRouter;
