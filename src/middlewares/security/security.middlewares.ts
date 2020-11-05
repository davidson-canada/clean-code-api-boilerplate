import { Request, Response, NextFunction } from "express";
import Config from "../../config";
import { constants } from "http2";

export default class SecurityMiddlewares {
  public static authenticate = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers["x-api-key"] && req.headers["x-api-key"] === Config.getInstance().apiKey) next();
    else res.status(constants.HTTP_STATUS_UNAUTHORIZED).end();
  };
}
