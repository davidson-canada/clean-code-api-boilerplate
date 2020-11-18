import { Request, Response, NextFunction } from "express";
import { BaseController } from "../../utils/baseController.utils";
import { Injectable, NestMiddleware } from "@nestjs/common";
import passport from "passport";

@Injectable()
export default class JwtMiddlewares implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    console.log("JwtMiddlewares");
    if (passport.authenticate("jwt", { session: false })) next();
    else BaseController.unauthorized(res);
  }
}
