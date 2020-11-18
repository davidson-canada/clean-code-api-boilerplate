import { Request, Response, NextFunction } from "express";
import Config from "../../config";
import { constants } from "http2";
import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export default class SecurityMiddlewares implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    if (req.headers["x-api-key"] && req.headers["x-api-key"] === Config.getInstance().apiKey) next();
    else res.status(constants.HTTP_STATUS_UNAUTHORIZED).end();
  }
}
