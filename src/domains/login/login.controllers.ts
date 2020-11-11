import { Request, Response } from "express";
import passport from "passport";
import LoginServices from "./login.services";
import { ResetPasswordDTO, ReturnSubmitLoginDTO } from "../shared/dto/login.dto";
import { BaseController } from "../../utils/baseController.utils";

export default class LoginControllers extends BaseController {
  constructor() {
    super();
  }

  public signIn = (req: Request, res: Response, next): any => {
    // call the passport defintion in auth.services.ts
    return passport.authenticate("login", async (err, response, _info) => {
      try {
        if (err || !response) {
          return super.notFound(res, err.message);
        }

        if (response && response.user?.status) {
          const returnSubmitLoginDTO: ReturnSubmitLoginDTO = {
            token: response.token,
            user: response.user,
          };
          return super.ok(res, returnSubmitLoginDTO);
        } else {
          super.notFound(res, "Account was disable, Please reach your Administrator");
        }
      } catch (e) {
        return super.fail(res, e.message);
      }
    })(req, res, next);
  };

  public resetPassword = async (req: Request, res: Response): Promise<Response> => {
    try {
      const resetPasswordDTO: ResetPasswordDTO = { ...req.body };

      if (resetPasswordDTO.userId && resetPasswordDTO.password) {
        await LoginServices.getInstance().forgetUserPassword(resetPasswordDTO.userId, resetPasswordDTO.password);
        return super.ok(res, {
          message: "Password has been updated",
        });
      } else {
        return super.badRequest(res, "Please provide an userId and/or a password");
      }
    } catch (e) {
      return super.fail(res, e.message);
    }
  };
}
