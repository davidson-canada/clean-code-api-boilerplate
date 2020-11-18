import AuthServices from "../../middlewares/auth/auth.services";
import { UsersServices } from "../users/users.services";

import { User } from "../users/users.models";
import Config from "../../config";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class LoginServices {
  private config: Config;

  public constructor(private usersServices: UsersServices, private authServices: AuthServices) {
    this.config = Config.getInstance();
  }

  login = async (email: string, passwordInput: string): Promise<any> => {
    const user = await this.usersServices.findOne({ email });
    if (!user) {
      return Promise.reject("User not found");
    } else {
      const { password, ...infoUser } = user;
      const validate: boolean = await this.authServices.comparePassword(passwordInput, password);
      if (validate) return infoUser;
      else return Promise.reject("Wrong password");
    }
  };

  forgetUserPassword = async (user: User, oldPassword: string, newPassword: string): Promise<User> => {
    if (await this.authServices.comparePassword(oldPassword, user.password)) {
      console.log("password correct", newPassword);
      user.password = await this.authServices.encryptPassword(newPassword);

      return this.usersServices.updateById(user.id, user);
    } else {
      throw Error("Wrong password");
    }
  };
}
