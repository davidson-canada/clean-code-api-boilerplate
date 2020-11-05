import { Router } from "express";
import LoginControllers from "./login.controllers";

export const publicLoginEndpoints: Router = Router();
export const privateLoginEndpoints: Router = Router();

const loginController = new LoginControllers();

/**
 * @swagger
 * /v1/signin:
 *   post:
 *     tags:
 *       - "[User] Login"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubmitLoginDTO'
 *           example:
 *             email: admin@admin.com
 *             password: admin
 *     description: Log in the user or admin to the application
 *     produces:
 *       - application/json
 *     security:
 *       - api_key: []
 *     responses:
 *       '200':
 *         description: an user with JWT auth
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   schema:
 *                   $ref: "#/components/schemas/UserDTO"
 *                 token:
 *                   type: string
 *       '401':
 *         description: Unauthorized you don't have the authorisation to perform this action
 *       '400':
 *         description: Missing parameter in the request
 *       '500':
 *         description: Internal server error
 */
publicLoginEndpoints.post("/signin", loginController.signIn);

/**
 * @swagger
 * /v1/secure/resetPassword:
 *   put:
 *     tags:
 *       - "[User] Login"
 *     requestBody:
 *       required: true
 *       description: body must contain the new password
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordDTO'
 *     produces:
 *       - application/json
 *     security:
 *       - api_key: []
 *       - jwt: []
 *     responses:
 *       '200':
 *         description: reset password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '401':
 *         description: Unauthorized you don't have the authorisation to perform this action
 *       '400':
 *         description: Missing parameter in the request
 *       '500':
 *         description: Internal server error
 */
privateLoginEndpoints.put("/resetPassword", loginController.resetPassword);
