import { NestFactory } from "@nestjs/core";
import { logger } from "./utils/logger.utils";
import { AppModule } from "./application/app.module";
import MongoDbConnector from "./repositories/mongo.db";
import Config, { environments } from "./config";
import { swagger } from "./docs/swagger.api";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (Config.getInstance().environment != environments.PRODUCTION)
    app.use("/api-docs", swagger.swaggerUi.serve, swagger.swaggerUi.setup(swagger.swaggerSpec, { explorer: true }));

  await app.listen(Config.getInstance().port);
  logger.info(`listening on port ${Config.getInstance().port}`);
}
bootstrap();
