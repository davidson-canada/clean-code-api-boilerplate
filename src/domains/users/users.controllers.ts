import { Request, Response } from "express";
import { User } from "./users.models";
import { UsersServices } from "./users.services";
import AuthServices from "../../middlewares/auth/auth.services";
import { GetUserDTO, UserDTO, UsersDTO } from "../shared/dto/users.dto";
import { BaseController } from "../../utils/baseController.utils";
import { logger } from "../../utils/logger.utils";

export default class UsersControllers extends BaseController {
  private static instance: UsersControllers;
  private usersServices: UsersServices;
  private authService: AuthServices;

  private constructor() {
    super();
    this.authService = AuthServices.getInstance();
    this.usersServices = UsersServices.getInstance();
  }

  public static getInstance = (): UsersControllers => {
    if (!UsersControllers.instance) {
      UsersControllers.instance = new UsersControllers();
    }

    return UsersControllers.instance;
  };

  public getUser = async (req: Request, res: Response): Promise<Response> => {
    const getUserDTO: GetUserDTO = { userId: req.params.userId };
    if (!getUserDTO.userId) {
      return super.badRequest(res, "Error: Please provide a 'userId'.");
    } else {
      this.usersServices
        .findById(getUserDTO.userId)
        .then((user: User) => {
          return super.ok(res, User.toUserDTO(user));
        })
        .catch((e: Error) => {
          return super.notFound(res, e.message);
        });
    }
  };

  public getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
      const users: User[] = await this.usersServices.find();

      const usersDTO: UsersDTO = { users: [] };
      for (const user of users) {
        usersDTO.users.push(User.toUserDTO(user));
      }

      return super.ok(res, usersDTO);
    } catch (e) {
      return super.fail(res, e.message);
    }
  };

  public updateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userDTO: UserDTO = { _id: req.params.userId, ...req.body };
      const userToUpdate: User = User.fromUserDTO(userDTO);

      if (userToUpdate.password) userToUpdate.password = await this.authService.encryptPassword(userToUpdate.password);
      else delete userToUpdate.password;
      delete userToUpdate.isAdmin; // ne semble pas etre pris en compte
      delete userToUpdate.createdAt;
      this.usersServices
        .updateById(userDTO._id, userToUpdate)
        .then((userUpdated) => {
          logger.log("userUpdated", userUpdated);
          return super.ok(res, User.toUserDTO(userUpdated)); // le user renvoyé n'est pas update...
        })
        .catch((err) => {
          logger.error("an error occurred when trying to update the user : ", err);
          return super.notFound(res, "The user you try to update doesn't exist in the database");
        });
    } catch (e) {
      logger.error("an error occurred when trying to update the user : ", e);
      return super.fail(res, e.message);
    }
  };

  public postUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userDTO: UserDTO = { _id: req.params.userId, ...req.body };
      const userToCreate: User = User.fromUserDTO(userDTO);

      this.usersServices
        .create(userToCreate)
        .then((userCreated) => {
          logger.log("User Created", userCreated);
          return super.ok(res, User.toUserDTO(userCreated));
        })
        .catch((err) => {
          logger.error("an error occurred when trying to create the user : ", err);
          return super.fail(res, "an error occurred when trying to create the user");
        });
    } catch (e) {
      logger.error(e);
      return super.fail(res, e.message);
    }
  };

  public deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const getUserDTO: GetUserDTO = { userId: req.params.userId };

      const result = await this.usersServices.deleteById(getUserDTO.userId);
      if (result) {
        return super.ok(res, { message: "User has been deleted" });
      } else {
        return super.notFound(res, "user not found");
      }
    } catch (e) {
      return super.fail(res, e.message);
    }
  };
}
