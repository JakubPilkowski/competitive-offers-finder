const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Allegro price comparator API",
      version: "1.0.0",
      description: "API documentation for your project",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/**/*.ts"],
};

export default swaggerOptions;
