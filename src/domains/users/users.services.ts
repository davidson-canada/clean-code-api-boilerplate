import { UsersRepositories } from "./users.repositories";
import { User } from "./users.models";
import { BaseCRUDUtils } from "../../utils/baseCRUD.utils";
import AuthServices from "../../middlewares/auth/auth.services";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersServices implements BaseCRUDUtils<User> {
  constructor(private usersRepositories: UsersRepositories) {}

  public create = async (newEntity: User): Promise<User> => {
    const user = await this.findOne({ email: newEntity.email.toLowerCase() });
    if (user) throw new Error("User already exists");

    const encryptedPassword: string = await AuthServices.getInstance().encryptPassword(newEntity.password);

    newEntity.email = newEntity.email.toLowerCase();
    newEntity.password = encryptedPassword;
    newEntity.isAdmin = false;
    newEntity.status = true;
    newEntity.createdAt = new Date().toISOString();

    return this.usersRepositories.create(newEntity);
  };

  public updateById = async (id: string, entity: User): Promise<User> => {
    return this.usersRepositories.updateById(id, entity);
  };

  public findById = async (id: string): Promise<User> => {
    return this.usersRepositories.findById(id);
  };

  public find = async (options?: Record<string, unknown>): Promise<User[]> => {
    return this.usersRepositories.find(options);
  };

  public findOne = async (options?: Record<string, unknown>): Promise<User> => {
    return this.usersRepositories.findOne(options);
  };

  public deleteById = async (id: string): Promise<User> => {
    return this.usersRepositories.deleteById(id);
  };
}
