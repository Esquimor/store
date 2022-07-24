import * as express from 'express';
import * as bodyParser from 'body-parser';
import 'reflect-metadata';
import DefaultRouter from './routers/DefaultRouter';
import { createConnection } from 'typeorm';
import AuthRouter from './routers/AuthRouter';
import UserRouter from './routers/UserRouter';
import OrganizationRouter from './routers/OrganizationRouter';
import FurnitureRouter from './routers/FurnitureRouter';
import OrderRouter from './routers/OrderRouter';
const cors = require("cors");
const dotenv = require("dotenv");

class App {
  public app: express.Application;
  public routePrv: DefaultRouter = new DefaultRouter();
  public routeAuth: AuthRouter = new AuthRouter();
  public routeUser: UserRouter = new UserRouter();
  public routerFurniture: FurnitureRouter = new FurnitureRouter();
  public routeOrganization: OrganizationRouter = new OrganizationRouter();
  public routeOrder: OrderRouter = new OrderRouter();

  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
    this.routeAuth.routes(this.app);
    this.routeUser.routes(this.app);
    this.routerFurniture.routes(this.app);
    this.routeOrganization.routes(this.app);
    this.routeOrder.routes(this.app);
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