import {Request, Response} from 'express';
import UserDao from '../dao/UserDao';

export default class UserController {

  private userDao: UserDao = new UserDao();

  public async get(req: Request, res: Response) {
    const users = await this.userDao.getAll();
    if (!users) {
      res.status(400).json({message: 'users not found'});
      return;
    }
    res.json(users)
  }

  public async getById(req: Request, res: Response) {
    const id = (req.query.id as unknown as string|undefined);
    if (!id) {
      res.status(400).json({message: 'missing param'});
      return;
    }
    const user = await this.userDao.getById(id);
    if (!user) {
      res.status(400).json({message: 'user not found'});
      return;
    }
    res.json(user);
  }
}