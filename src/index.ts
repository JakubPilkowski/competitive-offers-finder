import express from "express";
import ecatRouter from "./routes/ec-at";
import allegroRouter from "./routes/allegro";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./swagger-options";

const app = express();

const PORT = 3000;

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const routes = [ecatRouter, allegroRouter];

routes.forEach((route) => {
  app.use("/api", route);
});

app.get("/", (req, res) => {
  res.send("Hello World! This is the root of the API");
});

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
