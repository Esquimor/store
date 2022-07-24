import { Response} from 'express';
import OrderDao from '../dao/OrderDao';
import { RequestAuth } from '../middleware/auth';
import FormCreateOrderWithFurnitures from "../form/Order/FormCreateOrderWithFurnitures";
import { Furniture } from '../entity/Furniture';
import { Order } from '../entity/Order';

export default class OrderController {

  private orderDao: OrderDao = new OrderDao();

  public async createWithFurnitures(req: RequestAuth, res: Response) {
    const query = (req.body as unknown as {
      name: string;
      furnitures: {
        name: string;
        description?: string;
      }[]
    });
    const form = new FormCreateOrderWithFurnitures(query);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }

    // Create Furnitures
    const furnitures = query.furnitures.map(fur => {
      const furniture = new Furniture();
      furniture.name = fur.name;
      furniture.description = fur.description;
      return furniture;
    });

    // Create Order;
    const order = new Order();
    order.furnitures = furnitures;
    order.name = query.name;
    
    const user = req.user;
    order.user = user;
    order.organization = user.organization;
    
    const orderSaved = await this.orderDao.create(order);
    if (!orderSaved) {
      res.status(400).json({message: 'an error has occured'});
      return;
    }
    res.json({ order: {furnitures: orderSaved.furnitures, id: orderSaved.id, status: orderSaved.status} })
  }

  public async get(req: RequestAuth, res: Response) {
    const user = req.user;
    const orders = await this.orderDao.getByOrganizationWithFurnitures(user.organization);
    if (!orders) {
      res.status(400).json({message: 'orders not found'});
      return;
    }
    res.json({orders})
  }
}