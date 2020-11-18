import { Request, Response, NextFunction } from "express";
import { logger } from "../../utils/logger.utils";
import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export default class LogIncomingRequestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    logger.info(`[${req.method}] ${req.originalUrl}`);
    next();
  }
}
