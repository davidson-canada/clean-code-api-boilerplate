import * as express from "express";
import { IDTO } from "../domains/shared/dto/dto.utils";
import { constants } from "http2";

export abstract class BaseController {
  public static jsonResponse(res: express.Response, code: number, message: string) {
    return res.status(code).json({ message });
  }

  public ok(res: express.Response, dto?: IDTO | IDTO[]) {
    if (dto) {
      return res.status(constants.HTTP_STATUS_OK).json(dto);
    } else {
      return res.sendStatus(constants.HTTP_STATUS_OK);
    }
  }

  public created(res: express.Response) {
    return res.sendStatus(constants.HTTP_STATUS_CREATED);
  }

  public badRequest(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, constants.HTTP_STATUS_BAD_REQUEST, message ? message : "Invalid syntax.");
  }

  public static unauthorized(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, constants.HTTP_STATUS_UNAUTHORIZED, message ? message : "Unauthorized");
  }

  public forbidden(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, constants.HTTP_STATUS_FORBIDDEN, message ? message : "Forbidden");
  }

  public notFound(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, constants.HTTP_STATUS_NOT_FOUND, message ? message : "Not found");
  }

  public conflict(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, constants.HTTP_STATUS_CONFLICT, message ? message : "Conflict");
  }

  public todo(res: express.Response) {
    return BaseController.jsonResponse(res, constants.HTTP_STATUS_TEAPOT, "TODO");
  }

  public fail(res: express.Response, error: Error | string) {
    return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      message: error.toString(),
    });
  }
}
