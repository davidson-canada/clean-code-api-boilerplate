import { Router } from "express";
import UsersControllers from "./users.controllers";
import AdminMiddlewares from "../middlewares/auth/admin.middlewares";

export const userEndpoints: Router = Router();

const usersControllers: UsersControllers = new UsersControllers();

/**
 * @swagger
 * /v1/secure/users:
 *   get:
 *     tags:
 *       - "[Admin] Users"
 *     description: this endpoints to get all users
 *     produces:
 *       - application/json
 *     security:
 *       - api_key: []
 *       - jwt: []
 *     responses:
 *       '200':
 *         description: get list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 schema:
 *                 $ref: '#/components/schemas/UserDTO'
 *
 *       '401':
 *         description: Unauthorized you don't have the authorisation to perform this action
 *       '400':
 *         description: Missing parameter in the request
 *       '500':
 *         description: Internal server error
 */
userEndpoints.get("/users", AdminMiddlewares.isAdmin, usersControllers.getUsers);

/**
 * @swagger
 * /v1/secure/users/{userId}:
 *   get:
 *     tags:
 *       - "[Admin] Users"
 *     description: get a user
 *     parameters:
 *       - name: userId
 *         description: Id for an User.
 *         in: path
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     security:
 *       - api_key: []
 *       - jwt: []
 *     responses:
 *       '200':
 *         description: return a user if found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               schema:
 *               $ref: '#/components/schemas/UserDTO'
 *       '401':
 *         description: Unauthorized you don't have the authorisation to perform this action
 *       '400':
 *         description: Missing parameter in the request
 *       '500':
 *         description: Internal server error
 */
userEndpoints.get("/users/:userId", AdminMiddlewares.isAdmin, usersControllers.getUser);

/**
 * @swagger
 * /v1/secure/users/{userId}:
 *   put:
 *     tags:
 *       - "[Admin] Users"
 *     parameters:
 *      - name: userId
 *        in: path
 *        type: string
 *        description : userId
 *     requestBody:
 *       description: An user to update
 *       required: true
 *       content:
 *           application/json:
 *             schema:
 *               type: object
 *               schema:
 *               $ref: '#/components/schemas/UserDTO'
 *     description: Update an user by id
 *     produces:
 *       - application/json
 *     security:
 *       - api_key: []
 *       - jwt: []
 *     responses:
 *       '200':
 *         description: the user has been updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               schema:
 *               $ref: '#/components/schemas/UserDTO'
 *       '401':
 *         description: Unauthorized you don't have the authorisation to perform this action
 *       '400':
 *         description: Missing parameter in the request
 *       '500':
 *         description: Internal server error
 */
userEndpoints.put("/users/:userId", AdminMiddlewares.isAdmin, usersControllers.updateUser);

/**
 * @swagger
 * /v1/secure/users:
 *   post:
 *     tags:
 *       - "[Admin] Users"
 *     description: Create an user
 *     requestBody:
 *       required: true
 *       description: Definition of user
 *       content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserDTO'
 *     produces:
 *       - application/json
 *     security:
 *       - api_key: []
 *       - jwt: []
 *     responses:
 *       '200':
 *         description: Returns the user created with success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               schema:
 *               $ref: '#/components/schemas/UserDTO'
 *       '401':
 *         description: Unauthorized! you don't have the authorisation to perform this action
 *       '400':
 *         description: Missing parameter in the request
 *       '500':
 *         description: Internal server error
 */
userEndpoints.post("/users", AdminMiddlewares.isAdmin, usersControllers.postUser);

/**
 * @swagger
 * /v1/secure/users/{userId}:
 *   delete:
 *     tags:
 *       - "[Admin] Users"
 *     description: delete a user
 *     parameters:
 *       - name: userId
 *         description: Id for an User.
 *         in: path
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     security:
 *       - api_key: []
 *       - jwt: []
 *     responses:
 *       '200':
 *         description: return a message about the deletion
 *         content:
 *           application/json:
 *             schema:
 *               message:
 *               type: string
 *       '401':
 *         description: Unauthorized you don't have the authorisation to perform this action
 *       '400':
 *         description: Missing parameter in the request
 *       '500':
 *         description: Internal server error
 */
userEndpoints.delete("/users/:userId", AdminMiddlewares.isAdmin, usersControllers.deleteUser);
