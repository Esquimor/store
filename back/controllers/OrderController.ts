import { Response} from 'express';
import OrderDao from '../dao/OrderDao';
import { RequestAuth } from '../middleware/auth';
import { RequestOrder } from "../middleware/orderAccessById";
import FormCreateOrderWithFurnitures from "../form/Order/FormCreateOrderWithFurnitures";
import FormGetOrders from "../form/Order/FormGetOrders";
import { Order } from '../entity/Order';
import { ORDER_STATUS } from '../../commons/Interface/Order';
import { ITEM_STATUS } from '../../commons/Interface/Item';
import FormUpdateOrder from "../form/Order/FormUpdateOrder";
import { Item } from '../entity/Item';
import { Search, Pagination } from "../../commons/Interface/Filter";

export default class OrderController {

  private orderDao: OrderDao = new OrderDao();

  public async createWithFurnitures(req: RequestAuth, res: Response) {
    const query = (req.body as unknown as {
      name: string;
      items: {
        furnitureVersionId: string;
        quantity: number;
      }[]
    });
    const form = new FormCreateOrderWithFurnitures(query);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }

    // Create Furnitures
    const items = query.items.reduce((acc, ite) => {
      let ites = [];
      for(let i =0; i < ite.quantity; i++) {
        const item = new Item();
        item.furnitureVersionId = ite.furnitureVersionId as unknown as number;
        ites = [...ites, item]
      }
      return [...acc, ...ites];
    }, []);

    // Create Order;
    const order = new Order();
    order.items = items;
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
      order: orderSaved.orderForResponseWithItemsAndCreator()
    })
  }

  public async get(req: RequestAuth, res: Response) {
    interface Query extends Search, Pagination {
      status?: ORDER_STATUS;
      created_by?: string;
    }

    const query = (req.query as unknown as Query);
    const form = new FormGetOrders(query);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }

    const user = req.user;
    const [orders, count] = await this.orderDao.getByOrganizationWithItemsWithFurnitureVersionWithFurniture(
      user.organization,
      query
    );
    if (!orders) {
      res.status(400).json({message: 'orders not found'});
      return;
    }
    res.json({orders, count})
  }

  public async getOrderByStatusCounted(req: RequestAuth, res: Response) {
    const user = req.user;
    const promises = Object.values(ORDER_STATUS).map((curr) => this.orderDao.getCountedOrderByOrganizationAndByStatus(user.organization, curr))
    const result = await Promise.all(promises)
    const counted = Object.values(ORDER_STATUS).reduce((acc, curr, index) => ({...acc, [curr]: result[index]}), {})
    res.json({counted})
  }

  public getById(req: RequestOrder, res: Response) {
    const order = req.order
    res.json({ 
      order: order.orderForResponseWithItemsAndCreator()
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
      order: savedOrder.orderForResponseWithItemsAndCreator()
    })
  }

  public async validate(req: RequestOrder, res: Response) {
    const order = req.order

    order.status = ORDER_STATUS.VALIDATED;
    order.items.map(item => {
      if (item.status === ITEM_STATUS.WANTED) {
        item.status = ITEM_STATUS.VALIDED
      }
    })

    const savedOrder = await this.orderDao.update(order) as Order

    if (!savedOrder) {
      res.status(400).json({message: 'an error has occured'});
      return;
    }

    res.json({ 
      order: savedOrder.orderForResponseWithItemsAndCreator()
    })
  }
}