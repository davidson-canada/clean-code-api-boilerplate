import mongoose from "mongoose";
import Config from "../config";
import { logger } from "../utils/logger.utils";

export default class MongoDbConnector {
  private static instance: MongoDbConnector;
  private db = null;

  public constructor() {
    mongoose.set("useCreateIndex", true);

    this.initMongoDb();
  }

  public static getInstance = (): MongoDbConnector => {
    if (!MongoDbConnector.instance) {
      MongoDbConnector.instance = new MongoDbConnector();
    }

    return MongoDbConnector.instance;
  };

  private initMongoDb = function (): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        const options = {
          useUnifiedTopology: true,
          useNewUrlParser: true,
        };
        mongoose.connect(Config.getInstance().mongodbUri, options).catch(() => {
          logger.error("error");
        });
        this.db = mongoose.connection;
        this.db.on("error", function () {
          logger.error("connection error");
          reject(false);
        });
        this.db.once("open", function () {
          logger.info("We are connected!");
          return resolve(true);
        });
      } catch (e) {
        logger.error("Connection failed: ", e);
        reject(false);
      }
    });
  };

  public closeDatabase = (): void => {
    return this.db.close();
  };
}
