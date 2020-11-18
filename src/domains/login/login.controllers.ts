import LoginServices from "./login.services";
import { Response } from "express";
import { ResetPasswordDTO, ReturnSubmitLoginDTO, SubmitLoginDTO } from "../shared/dto/login.dto";
import { BaseController } from "../../utils/baseController.utils";
import { User } from "../users/users.models";
import { UsersServices } from "../users/users.services";
import AuthServices from "../../middlewares/auth/auth.services";
import { UserDTO } from "../shared/dto/users.dto";
import { Body, Controller, Post, Put, Res } from "@nestjs/common";

@Controller("login")
export default class LoginControllers extends BaseController {
  constructor(
    private loginServices: LoginServices,
    private userServices: UsersServices,
    private authServices: AuthServices
  ) {
    super();
  }

  @Post("signin")
  async signIn(@Body() submitLoginDTO: SubmitLoginDTO, @Res() res): Promise<Response> {
    try {
      return this.loginServices
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
  }

  @Post("signup")
  async signUp(@Body() userDTO: UserDTO, @Res() res): Promise<Response> {
    try {
      const newUser: any = await this.userServices.create(User.fromUserDTO(userDTO));
      const response: ReturnSubmitLoginDTO = {
        token: this.authServices.getJWT(newUser),
        user: newUser,
      };

      return super.ok(res, response);
    } catch (e) {
      return super.fail(res, e.message);
    }
  }

  @Put("resetPassword")
  async resetPassword(@Body() resetPasswordDTO: ResetPasswordDTO, @Res() res): Promise<Response> {
    try {
      //const resetPasswordDTO: ResetPasswordDTO = { ...req.body };

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
  }
}
