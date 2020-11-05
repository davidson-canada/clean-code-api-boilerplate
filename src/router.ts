import { Router } from "express";
import { routerV1 } from "./routers/router-v1";
import cors from "cors";
import parser from "body-parser";
import { logIncomingRequest } from "./middlewares/logger/logger.middlewares";
import { swagger } from "./docs/swagger.api";
import { expressMiddleware } from "cls-rtracer";
import SecurityMiddlewares from "./middlewares/security/security.middlewares";
import Config, { environments } from "./config";

export const router = Router({ strict: true });

router.use(expressMiddleware({ headerName: "request-id", useHeader: true }));
router.use(cors());
router.use(parser.json());
router.use(logIncomingRequest);

if (Config.getInstance().environment != environments.PRODUCTION)
  router.use("/api-docs", swagger.swaggerUi.serve, swagger.swaggerUi.setup(swagger.swaggerSpec, { explorer: true }));

router.use("/v1", SecurityMiddlewares.authenticate, routerV1);
