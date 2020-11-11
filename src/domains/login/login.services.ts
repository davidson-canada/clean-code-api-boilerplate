import AuthService from "../../middlewares/auth/auth.service";
import UserSchema, { User } from "../users/users.models";
import { UsersRepositories } from "../users/users.repositories";
import { UsersServices } from "../users/users.services";

export default class LoginServices {
  private static instance: LoginServices;
  private repository: UsersRepositories;
  private authService: AuthService;
  private usersServices: UsersServices;

  private constructor() {
    this.repository = new UsersRepositories(); // TODO remove
    this.authService = AuthService.getInstance();
    this.usersServices = UsersServices.getInstance();
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
      const validate: boolean = await this.authService.comparePassword(passwordInput, password);
      if (validate) return infoUser;
      else return Promise.reject("Wrong password");
    }
  };

  forgetUserPassword = async (userId: string, passwordInput: string): Promise<User> => {
    const newPassword: string = await this.authService.encryptPassword(passwordInput);
    const userUpdate = { password: newPassword };
    return this.repository.updateById(userId, userUpdate); // TODO change by user service call
  };
}
