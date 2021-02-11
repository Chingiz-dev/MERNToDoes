const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    swagger: "2.0",
    info: {
      title: "ToDoes MERN",
      description: "ToDoes API information",
      contact: {
        name: "ToDoes developer",
        url: "http://www.chingiz-project.com/support",
        email: "shigayevphone@gmail.com",
      },
      version: "1.0.0",
      servers: ["http://localhost:5000"],
      // components: {
      //   securitySchemes: {
      //     bearerAuth: {
      //       type: "http",
      //       scheme: "bearer",
      //       bearerFormat: "JWT",
      //     },
      //   },
      // },
      // security: [
      //   {
      //     bearerAuth: [],
      //   },
      // ],
    },
    // basePath: "http://localhost:5000/api-docs/",
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};