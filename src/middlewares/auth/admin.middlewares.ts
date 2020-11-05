import { Request, Response, NextFunction } from "express";
import { BaseController } from "../../utils/baseController.utils";

export default class AdminMiddlewares {
  public static isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if ((req.user as any).isAdmin) next();
    else BaseController.unauthorized(res);
  };
}
