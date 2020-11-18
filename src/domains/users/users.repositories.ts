import UserSchema, { User } from "./users.models";
import { BaseCRUDUtils } from "../../utils/baseCRUD.utils";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersRepositories implements BaseCRUDUtils<User> {
  public constructor() {}

  async find(options: Record<string, unknown>): Promise<User[]> {
    return UserSchema.find(options).lean();
  }

  async findById(id: string): Promise<User> {
    return UserSchema.findById(id).lean();
  }

  async findOne(options: Record<string, unknown>): Promise<User> {
    return UserSchema.findOne(options).lean();
  }

  create(newEntity: User): Promise<User> {
    const _user = new UserSchema(newEntity);
    return _user.save();
  }

  async updateById(id: string, entity: Partial<User>): Promise<User> {
    return UserSchema.findByIdAndUpdate(id, entity).lean();
  }

  async deleteById(id: string): Promise<User> {
    return UserSchema.findByIdAndDelete(id).lean();
  }
}
