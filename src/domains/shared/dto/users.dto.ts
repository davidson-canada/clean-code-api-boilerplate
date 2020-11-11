import { IDTO } from "./dto.utils";

/**
 * @swagger
 * components:
 *   schemas:
 *     UserDTO:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: uuid
 *           readOnly: true
 *         createdAt:
 *           type: string
 *           readOnly: true
 *         email:
 *           type: string
 *           format: email
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         isAdmin:
 *           type: boolean
 *         password:
 *           type: string
 *         phone:
 *           type: string
 *         status:
 *           type: boolean
 */
export interface UserDTO extends IDTO {
  createdAt?: string;
  email: string;
  firstName?: string;
  isAdmin?: boolean;
  lastName?: string;
  password?: string;
  phone?: string;
  status: boolean;
  _id?: string;
}

export interface UsersDTO extends IDTO {
  users: UserDTO[];
}

/**
 * @swagger
 * components:
 *   schemas:
 *     GetUserDTO:
 *       type: object
 *       properties:
 *         userId:
 *          type: string
 *          format: uuid
 */
export interface GetUserDTO extends IDTO {
  userId: string;
}
