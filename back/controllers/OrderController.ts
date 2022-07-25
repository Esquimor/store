import { Response} from 'express';
import OrderDao from '../dao/OrderDao';
import { RequestAuth } from '../middleware/auth';
import { RequestOrder } from "../middleware/orderAccessById";
import FormCreateOrderWithFurnitures from "../form/Order/FormCreateOrderWithFurnitures";
import { Furniture } from '../entity/Furniture';
import { Order } from '../entity/Order';
import { ORDER_STATUS } from '../../commons/Interface/Order';
import { FURNITURE_STATUS } from '../../commons/Interface/Furniture';
import FormUpdateOrder from "../form/Order/FormUpdateOrder";

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
    order.creator = user;
    order.organization = user.organization;
    
    const orderSaved = await this.orderDao.create(order);
    if (!orderSaved) {
      res.status(400).json({message: 'an error has occured'});
      return;
    }
    res.json({
      order: orderSaved.orderForResponseWithFurnituresAndCreator()
    })
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

  public getById(req: RequestOrder, res: Response) {
    const order = req.order
    res.json({ 
      order: order.orderForResponseWithFurnituresAndCreator()
    })
  }

  public async update(req: RequestOrder, res: Response) {
    const query = (req.body as unknown as { name?: string, status?: ORDER_STATUS;});
    const form = new FormUpdateOrder(query);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }

    const order = req.order
    if (query.status) {
      order.status = query.status
    }
    if (query.name) {
      order.name = query.name;
    }
    const savedOrder = await this.orderDao.update(order) as Order

    if (!savedOrder) {
      res.status(400).json({message: 'an error has occured'});
      return;
    }

    res.json({ 
      order: savedOrder.orderForResponseWithFurnituresAndCreator()
    })
  }

  public async validate(req: RequestOrder, res: Response) {
    const order = req.order

    order.status = ORDER_STATUS.VALIDATED;
    order.furnitures.map(furn => {
      if (furn.status === FURNITURE_STATUS.WANTED) {
        furn.status = FURNITURE_STATUS.VALIDED
      }
    })

    const savedOrder = await this.orderDao.update(order) as Order

    if (!savedOrder) {
      res.status(400).json({message: 'an error has occured'});
      return;
    }

    res.json({ 
      order: savedOrder.orderForResponseWithFurnituresAndCreator()
    })
  }
}