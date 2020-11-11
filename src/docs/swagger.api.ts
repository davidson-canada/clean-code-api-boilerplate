import swaggerJSDoc, { SwaggerDefinition, Options } from "swagger-jsdoc";
import swaggerUi, { SwaggerOptions } from "swagger-ui-express";
import Config from "../config";
import { versionUtils } from "../utils/versions.utils";

const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Template API - " + Config.getInstance().environment,
    version: versionUtils.getPackageJSONVersion(),
    description:
      "Ceci est l'API de l'application Template API ! Toutes les requetes necessitent une api key en header x-api-key.",
  },
};

const swaggerOptions: Options = {
  swaggerDefinition,
  apis: ["./dist/**/*.endpoints.js", "./dist/**/*.dto.js", "./dist/**/*.d.ts"],
};

const swaggerSpec: SwaggerOptions = swaggerJSDoc(swaggerOptions);

export const swagger = { swaggerUi, swaggerSpec };
