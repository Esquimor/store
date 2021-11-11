import * as express from "express";
import * as bodyParser from "body-parser";
import "reflect-metadata";
import DefaultRouter from "./routers/DefaultRouter";
import { createConnection } from "typeorm";


class App {
  public app: express.Application;
  public routePrv: DefaultRouter = new DefaultRouter();

  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
  }

  private config(): void {
    // Create Database Connection
    createConnection()

    // Set Body config
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: false}));
  }
}

export default new App().app;