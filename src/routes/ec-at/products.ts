import { IEndpoint } from "../../types/IEndpoint";

import express from "express";
/**
 * @swagger
 * tags:
 *  name: EC-AT
 *  description: Products management
 * /api/ec-at/products/parse:
 *  get:
 *    tags: [EC-AT]
 *    description: Parse EC-AT products
 *  responses:
 *    200:
 *      description: Returns parsed products list
 *  content:
 *    application/json:
 */
const parseEcatProducts = <IEndpoint>{
  path: "/parse",
  method: "get",
  function: (req, res) => {
    res.send([]);
  },
};

const productsRouter = express.Router();

const routeName = "/products";

const endpoints = [parseEcatProducts];

endpoints.forEach((endpoint) => {
  productsRouter[endpoint.method](
    `${routeName}${endpoint.path}`,
    endpoint.function
  );
});

export default productsRouter;
