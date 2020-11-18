import { MiddlewareConsumer, Module } from "@nestjs/common";
import JwtMiddlewares from "../../middlewares/auth/jwt.middleware";
import UsersControllers from "./users.controllers";
import { UsersServices } from "./users.services";
import { UsersRepositories } from "./users.repositories";
import AuthServices from "../../middlewares/auth/auth.services";

@Module({
  imports: [],
  controllers: [UsersControllers],
  providers: [UsersServices, UsersRepositories, AuthServices],
  exports: [UsersServices, UsersRepositories],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddlewares).forRoutes(UsersControllers);
  }
}
