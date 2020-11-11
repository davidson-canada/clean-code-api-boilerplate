import express from "express";
import { router } from "./router";
import "./middlewares/auth/auth.services";
import MongoDbConnector from "./repositories/mongo.db";
import Config from "./config";

export const app = express();

Config.getInstance(); // initialize config
MongoDbConnector.getInstance(); // initialize mongo connection

app.disable("x-powered-by");
app.use("/", router);
