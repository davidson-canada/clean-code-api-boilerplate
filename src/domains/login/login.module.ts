import { MiddlewareConsumer, Module } from "@nestjs/common";
import LoginControllers from "./login.controllers";
import LoginServices from "./login.services";
import JwtMiddlewares from "../../middlewares/auth/jwt.middleware";
import AuthServices from "../../middlewares/auth/auth.services";
import { UsersServices } from "../users/users.services";
import { UsersModule } from "../users/users.module";
import { UsersRepositories } from "../users/users.repositories";

@Module({
  imports: [UsersModule],
  controllers: [LoginControllers],
  providers: [LoginServices, AuthServices],
})
export class LoginModule {}
