import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as boolParser from "express-query-boolean";
import 'reflect-metadata';
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import DefaultRouter from './routers/DefaultRouter';
import { createConnection } from 'typeorm';
import AuthRouter from './routers/AuthRouter';
import UserRouter from './routers/UserRouter';
import OrganizationRouter from './routers/OrganizationRouter';
import FurnitureRouter from './routers/FurnitureRouter';
import OrderRouter from './routers/OrderRouter';
import InventoryRouter from './routers/InventoryRouter';
import AddressRouter from './routers/AddressRouter';
import PlacementRouter from './routers/PlacementRouter';
import TagRouter from './routers/TagRouter';
import CategoryRouter from './routers/CategoryRouter';
import AttributRouter from './routers/AttributRouter';
import VariationRouter from './routers/VariationRouter';
const server = require('./schema')
const cors = require("cors");
const dotenv = require("dotenv");

// The `listen` method launches a web server.
server.start()

class App {
  public app: express.Application;
  public routePrv: DefaultRouter = new DefaultRouter();
  public routeAuth: AuthRouter = new AuthRouter();
  public routeUser: UserRouter = new UserRouter();
  public routerFurniture: FurnitureRouter = new FurnitureRouter();
  public routeOrganization: OrganizationRouter = new OrganizationRouter();
  public routeOrder: OrderRouter = new OrderRouter();
  public routerInventory: InventoryRouter = new InventoryRouter();
  public routerAddress: AddressRouter = new AddressRouter();
  public routerPlacement: PlacementRouter = new PlacementRouter();
  public routerTag: TagRouter = new TagRouter();
  public routerCategory: CategoryRouter = new CategoryRouter();
  public routerAttribut: AttributRouter = new AttributRouter();
  public routerVariation: VariationRouter = new VariationRouter();

  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
    this.routeAuth.routes(this.app);
    this.routeUser.routes(this.app);
    this.routerFurniture.routes(this.app);
    this.routeOrganization.routes(this.app);
    this.routeOrder.routes(this.app);
    this.routerInventory.routes(this.app);
    this.routerAddress.routes(this.app);
    this.routerPlacement.routes(this.app);
    this.routerTag.routes(this.app);
    this.routerCategory.routes(this.app);
    this.routerAttribut.routes(this.app);
    this.routerVariation.routes(this.app);
  }

  private config(): void {
    // Load environment variables from .env file
    dotenv.config();

    // Create Database Connection
    createConnection()

    this.app.use(bodyParser.json());
    this.app.use(boolParser());
    // CORS
    this.app.use(cors());
  }
}

export default new App().app;