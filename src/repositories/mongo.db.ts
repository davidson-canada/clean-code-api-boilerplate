import mongoose from "mongoose";
import Config from "../config";

export default class MongoDbConnector {
  private static instance: MongoDbConnector;
  private db = null;

  private constructor() {
    mongoose.set("useCreateIndex", true);

    this.initMongoDb();
  }

  public static getInstance = (): MongoDbConnector => {
    if (!MongoDbConnector.instance) {
      MongoDbConnector.instance = new MongoDbConnector();
    }

    return MongoDbConnector.instance;
  };

  private initMongoDb = async function () {
    try {
      const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      };
      mongoose.connect(Config.getInstance().mongodbUri, options).catch(() => {
        console.error("error");
      });
      this.db = mongoose.connection;
      this.db.on("error", console.error.bind(console, "connection error"));
      this.db.once("open", function () {
        console.info("We are connected!");
      });
      return true;
    } catch (e) {
      console.error("Connection failed: ", e);
      return false;
    }
  };

  public closeDatabase = () => {
    this.db.close();
  };
}
