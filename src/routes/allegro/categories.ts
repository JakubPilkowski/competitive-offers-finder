import { IEndpoint } from "../../types/IEndpoint";
import express from "express";

/**
 * @swagger
 * tags:
 *  name: Allegro
 * /api/allegro/categories/list:
 *  get:
 *   tags: [Allegro]
 *   description: Get all product categories list from Allegro
 *  responses:
 *   200:
 *   description: A list of all product categories
 *  content:
 *  application/json:
 */
const getProductCategories = <IEndpoint>{
  path: "/list",
  method: "get",
  function: async (req, res) => {
    res.send([]);
  },
};

const categoriesRouter = express.Router();

const routeName = "/categories";

const endpoints = [getProductCategories];

endpoints.forEach((endpoint) => {
  categoriesRouter[endpoint.method](
    `${routeName}${endpoint.path}`,
    endpoint.function
  );
});

export default categoriesRouter;
