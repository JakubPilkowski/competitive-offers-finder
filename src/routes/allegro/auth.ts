import { IEndpoint } from "../../types/IEndpoint";

import express from "express";

/**
 * @swagger
 * tags:
 *  name: Allegro
 *  description: Authentication
 * /api/allegro/auth/generateToken:
 *  get:
 *   tags: [Allegro]
 *   description: Authenticate with Allegro
 *  responses:
 *      200:
 *          description: Access token and refresh token pair
 *  content:
 *      application/json:
 *  schema:
 *      type: object
 *  properties:
 *      accessToken:
 *          type: string
 *      refreshToken:
 *          type: string
 */
const authenticate = <IEndpoint>{
  path: "/generateToken",
  method: "get",
  function: async (req, res) => {
    res.send([]);
  },
};

const authRouter = express.Router();

const routeName = "/auth";

const endpoints = [authenticate];

endpoints.forEach((endpoint) => {
  authRouter[endpoint.method](
    `${routeName}${endpoint.path}`,
    endpoint.function
  );
});

export default authRouter;
