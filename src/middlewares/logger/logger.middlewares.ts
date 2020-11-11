import { Request, Response, NextFunction } from "express";
import { logger } from "../../utils/logger.utils";
import { id } from "cls-rtracer";

export function logIncomingRequest(req: Request, _res: Response, next: NextFunction): void {
  logger.info(`[${req.method}] ${req.originalUrl} [request-id: ${id()}]`);
  next();
}
