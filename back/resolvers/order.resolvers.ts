import OrderDao from '../dao/OrderDao';

const orderDao: OrderDao = new OrderDao();

export default  {
  Query: {
    orders: () => orderDao.getAll(),
  },
}