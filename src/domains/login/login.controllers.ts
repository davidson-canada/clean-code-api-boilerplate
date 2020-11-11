import { Request, Response } from "express";
import passport from "passport";
import LoginServices from "./login.services";
import { ResetPasswordDTO, ReturnSubmitLoginDTO, SubmitLoginDTO } from "../shared/dto/login.dto";
import { BaseController } from "../../utils/baseController.utils";
import { User } from "../users/users.models";
import { UsersServices } from "../users/users.services";
import AuthServices from "../../middlewares/auth/auth.services";
import { UserDTO } from "../shared/dto/users.dto";

export default class LoginControllers extends BaseController {
  private static instance: LoginControllers;
  private userServices: UsersServices;
  private loginServices: LoginServices;
  private authServices: AuthServices;

  private constructor() {
    super();
    this.userServices = UsersServices.getInstance();
    this.loginServices = LoginServices.getInstance();
    this.authServices = AuthServices.getInstance();
  }

  public static getInstance = (): LoginControllers => {
    if (!LoginControllers.instance) {
      LoginControllers.instance = new LoginControllers();
    }

    return LoginControllers.instance;
  };

  public signIn = async (req: Request, res: Response): Promise<Response> => {
    const submitLoginDTO: SubmitLoginDTO = { ...req.body };

    try {
      this.loginServices
        .login(submitLoginDTO.email.toLowerCase(), submitLoginDTO.password)
        .then((user: User) => {
          if (user.status) {
            const response: ReturnSubmitLoginDTO = {
              token: this.authServices.getJWT(user),
              user: user,
            };

            return super.ok(res, response);
          } else {
            return super.notFound(res, "Account was disable, Please reach your Administrator");
          }
        })
        .catch((message: Error) => {
          return super.fail(res, message);
        });
    } catch (e) {
      return super.fail(res, e.message);
    }
  };

  public signUp = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userDTO: UserDTO = req.body;
      const newUser: any = await this.userServices.create(User.fromUserDTO(userDTO));
      const response: ReturnSubmitLoginDTO = {
        token: this.authServices.getJWT(newUser),
        user: newUser,
      };

      return super.ok(res, response);
    } catch (e) {
      return super.fail(res, e.message);
    }
  };

  public resetPassword = async (req: Request, res: Response): Promise<Response> => {
    try {
      const resetPasswordDTO: ResetPasswordDTO = { ...req.body };

      if (resetPasswordDTO.userId && resetPasswordDTO.oldPassword && resetPasswordDTO.newPassword) {
        const user: User = await this.userServices.findById(resetPasswordDTO.userId);

        await this.loginServices.forgetUserPassword(user, resetPasswordDTO.oldPassword, resetPasswordDTO.newPassword);
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
