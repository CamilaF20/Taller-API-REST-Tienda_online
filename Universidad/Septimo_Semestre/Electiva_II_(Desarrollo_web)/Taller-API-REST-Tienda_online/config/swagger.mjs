import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Tienda Online",
      version: "1.0.0",
      description: "Documentación de la API RESTFull de Clientes, Pedidos y Usuarios"
    },
    servers: [
      { url: "http://localhost:3330/api" }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      { bearerAuth: [] }
    ]
  },
  apis: ["./routes/*.mjs"], // 👈 busca anotaciones en las rutas
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
