import passport from "passport";
const localStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
import Config from "../../config";
import bcrypt from "bcrypt";
import LoginServices from "../../login/login.services";
import { JWTUser } from "../../login/login.models";
import jwt from "jsonwebtoken";
import { ReturnSubmitLoginDTO } from "../../shared/dto/login.dto";

export default class AuthService {
  private static instance: AuthService;

  public static getInstance = (): AuthService => {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }

    return AuthService.instance;
  };

  encryptPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, 12);
  };

  comparePassword = async (password: string, passwordEncrypted: string): Promise<boolean> => {
    return bcrypt.compare(password, passwordEncrypted);
  };

  getJWT = (user: any): string => {
    const body: JWTUser = {
      _id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    return jwt.sign(body, Config.getInstance().jwtSecretKey);
  };
}

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const { password: userPassword, ...info }: any = req.body;
        const newUser: any = await LoginServices.getInstance().createUser(email.toLowerCase(), password, info);
        done(null, newUser, info);
      } catch (e) {
        done(e);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user: any = await LoginServices.getInstance().login(email.toLowerCase(), password);
        if (!user) {
          return done({ message: "User not found" });
        } else {
          const response: ReturnSubmitLoginDTO = {
            token: AuthService.getInstance().getJWT(user),
            user: user,
          };

          return done(null, response, { message: "Logged in with success" });
        }
      } catch (e) {
        return done(e);
      }
    }
  )
);


// Decrypte token from every request
passport.use(
  new JWTStrategy(
    {
      secretOrKey: Config.getInstance().jwtSecretKey,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (tokenDecrypted: JWTUser, done) => {
      try {
        return done(null, tokenDecrypted as JWTUser);
      } catch (e) {
        done(e.message);
      }
    }
  )
);
