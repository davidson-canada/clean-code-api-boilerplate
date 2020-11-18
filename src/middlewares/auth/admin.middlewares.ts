import { Request, Response, NextFunction } from "express";
import { BaseController } from "../../utils/baseController.utils";
import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export default class AdminMiddlewares implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    if ((req.user as any).isAdmin) next();
    else BaseController.unauthorized(res);
  }
}
