import { Router } from "express";
import { userEndpoints } from "../users/users.endpoints";
import passport from "passport";
import { publicLoginEndpoints, privateLoginEndpoints } from "../login/login.endpoints";

export const routerV1 = Router();

// we securize all endpoints with jwt
routerV1.use("/secure",
  passport.authenticate("jwt", { session: false }), // call the passport definition in auth.services.ts
  userEndpoints,
  privateLoginEndpoints
);
routerV1.use("", publicLoginEndpoints);
