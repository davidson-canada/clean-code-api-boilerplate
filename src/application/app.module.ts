import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoginModule } from "../domains/login/login.module";
import LogIncomingRequestMiddleware from "../middlewares/logger/logger.middlewares";
import SecurityMiddlewares from "../middlewares/security/security.middlewares";
import UsersControllers from "../domains/users/users.controllers";
import AdminMiddlewares from "../middlewares/auth/admin.middlewares";
import Config, { environments } from "../config";
import MongoDbConnector from "../repositories/mongo.db";
import { swagger } from "../docs/swagger.api";
import { UsersModule } from "../domains/users/users.module";

@Module({
  imports: [LoginModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogIncomingRequestMiddleware).forRoutes("");
    consumer.apply(SecurityMiddlewares).forRoutes("");

    Config.getInstance(); // initialize config
    MongoDbConnector.getInstance(); // initialize mongo connection
  }
}
