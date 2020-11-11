import AuthServices from "../../middlewares/auth/auth.services";
import { UsersServices } from "../users/users.services";

import { User } from "../users/users.models";
import Config from "../../config";

export default class LoginServices {
  private static instance: LoginServices;
  private usersServices: UsersServices;
  private authServices: AuthServices;
  private config: Config;

  private constructor() {
    this.usersServices = UsersServices.getInstance();
    this.authServices = AuthServices.getInstance();
    this.config = Config.getInstance();
  }

  public static getInstance = (): LoginServices => {
    if (!LoginServices.instance) {
      LoginServices.instance = new LoginServices();
    }

    return LoginServices.instance;
  };

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
