import { UsersRepositories } from "./users.repositories";
import { User } from "./users.models";
import { BaseCRUDUtils } from "../utils/baseCRUD.utils";
import AuthService from "../middlewares/auth/auth.service";

export class UsersServices implements BaseCRUDUtils<User> {
  private repository: UsersRepositories;

  constructor() {
    this.repository = new UsersRepositories();
  }
  /*createUser = async (email: string, password: string, _info?: object): Promise<User> => {
    const user = await this.usersServices.findOne({ email: email.toLowerCase() });
    if (user) {
      return Promise.reject("User already exist");
    } else {
      const encryptedPassword: string = await this.authService.encryptPassword(password);

      const user: User = new UserSchema({
        email: email.toLowerCase(),
        password: encryptedPassword,
        isAdmin: false,
        status: true,
        createdAt: new Date().toISOString(),
      });

      const newUser = await this.usersServices.create(user); // TODO change by user service call
      return Promise.resolve(newUser);
    }
  };*/
  public create = async (newEntity: User): Promise<User> => {
    console.log("trying to create", newEntity);
    const user = await this.findOne({ email: newEntity.email.toLowerCase() });
    if (user) throw new Error("User already exists");

    const encryptedPassword: string = await AuthService.getInstance().encryptPassword(newEntity.password);

    newEntity.email = newEntity.email.toLowerCase();
    newEntity.password = encryptedPassword;
    newEntity.isAdmin = false;
    newEntity.status = true;
    newEntity.createdAt = new Date().toISOString();

    return this.repository.create(newEntity);
  };

  public updateById = async (id: string, entity: User): Promise<User> => {
    return this.repository.updateById(id, entity);
  };

  public findById = async (id: string): Promise<User> => {
    return this.repository.findById(id);
  };

  public find = async (options?: object): Promise<User[]> => {
    return this.repository.find(options);
  };

  public findOne = async (options?: object): Promise<User> => {
    return this.repository.findOne(options);
  };

  public deleteById = async (id: string): Promise<User> => {
    return this.repository.deleteById(id);
  };
}
