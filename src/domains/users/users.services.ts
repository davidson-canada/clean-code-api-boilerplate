import { UsersRepositories } from "./users.repositories";
import { User } from "./users.models";
import { BaseCRUDUtils } from "../../utils/baseCRUD.utils";
import AuthService from "../../middlewares/auth/auth.service";

export class UsersServices implements BaseCRUDUtils<User> {
  private repository: UsersRepositories;
  public static instance: UsersServices;

  private constructor() {
    this.repository = new UsersRepositories();
  }

  public static getInstance = (): UsersServices => {
    if (!UsersServices.instance) {
      UsersServices.instance = new UsersServices();
    }

    return UsersServices.instance;
  };

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
