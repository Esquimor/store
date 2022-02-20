import * as express from 'express';
import * as bodyParser from 'body-parser';
import 'reflect-metadata';
import DefaultRouter from './routers/DefaultRouter';
import { createConnection } from 'typeorm';
import AuthRouter from './routers/AuthRouter';
const cors = require("cors");
const dotenv = require("dotenv");

class App {
  public app: express.Application;
  public routePrv: DefaultRouter = new DefaultRouter();
  public routeAuth: AuthRouter = new AuthRouter();

  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
    this.routeAuth.routes(this.app);
  }

  private config(): void {
    // Load environment variables from .env file
    dotenv.config();

    // Create Database Connection
    createConnection()

    this.app.use(bodyParser.json());
    // CORS
    this.app.use(cors());
  }
}

export default new App().app;