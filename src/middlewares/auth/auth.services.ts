import Config from "../../config";
import bcrypt from "bcrypt";
import { JWTUser } from "../../domains/login/login.models";
import jwt from "jsonwebtoken";
import { User } from "../../domains/users/users.models";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

export default class AuthServices {
  private static instance: AuthServices;
  private config: Config;

  public static getInstance = (): AuthServices => {
    if (!AuthServices.instance) {
      AuthServices.instance = new AuthServices();
    }

    return AuthServices.instance;
  };

  private constructor() {
    this.config = Config.getInstance();
    this.initJwtDecryption();
  }

  // Decrypte token from every request
  private initJwtDecryption = () => {
    passport.use(
      new Strategy(
        {
          secretOrKey: this.config.jwtSecretKey,
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
  };

  encryptPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, 12);
  };

  comparePassword = async (password: string, passwordEncrypted: string): Promise<boolean> => {
    return bcrypt.compare(password, passwordEncrypted);
  };

  getJWT = (user: User): string => {
    const body: JWTUser = {
      _id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    return jwt.sign(body, this.config.jwtSecretKey);
  };
}
