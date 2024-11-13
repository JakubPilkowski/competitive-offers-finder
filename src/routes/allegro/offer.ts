import { IEndpoint } from "../../types/IEndpoint";
import express from "express";

const offerRouter = express.Router();

const routeName = "/offer";
/**
 * @swagger
 * tags:
 *  name: Allegro
 *  description: Offer management
 * /api/allegro/offer/competitive/find:
 *  get:
 *    tags: [Allegro]
 *    description: Find competitive offer
 *  responses:
 *    200:
 *      description: Returns competitive offer or null
 *  content:
 *    application/json:
 */
const findCompetitiveOffer = <IEndpoint>{
  path: "/competitive/find",
  method: "get",
  function: async (req, res) => {
    res.send([]);
  },
};

/**
 * @swagger
 * tags:
 *  name: Allegro
 *  description: Offer management
 * /api/allegro/offer/competitive/findMany:
 *  get:
 *    tags: [Allegro]
 *    description: Find competitive offers
 *  responses:
 *    200:
 *      description: Returns competitive offers list
 *  content:
 *    application/json:
 */
const findCompetitiveOffers = <IEndpoint>{
  path: "/competitive/findMany",
  method: "get",
  function: async (req, res) => {
    res.send([]);
  },
};

const endpoints = [findCompetitiveOffer, findCompetitiveOffers];

endpoints.forEach((endpoint) => {
  offerRouter[endpoint.method](
    `${routeName}${endpoint.path}`,
    endpoint.function
  );
});

export default offerRouter;
