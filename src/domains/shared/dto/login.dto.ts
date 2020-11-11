import { UserDTO } from "./users.dto";
import { IDTO } from "./dto.utils";

/**
 * @swagger
 * components:
 *   schemas:
 *     SubmitLoginDTO:
 *       type: object
 *       properties:
 *         email:
 *          type: string
 *         password:
 *           type: string
 *           format: password
 */
export interface SubmitLoginDTO extends IDTO {
  email: string;
  password: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ReturnSubmitLoginDTO:
 *       type: object
 *       properties:
 *         token:
 *          type: string
 *         user:
 *           type: object
 *           schema:
 *           $ref: '#/components/schemas/UserDTO'
 */
export interface ReturnSubmitLoginDTO extends IDTO {
  token: string;
  user: UserDTO;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ResetPasswordDTO:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *         oldPassword:
 *           type: string
 *           format: password
 *         newPassword:
 *           type: string
 *           format: password
 */
export interface ResetPasswordDTO extends IDTO {
  oldPassword: string;
  newPassword: string;
  userId: string;
}
