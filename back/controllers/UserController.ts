import {Request, Response} from 'express';
import UserDao from '../dao/UserDao';
import FormPatchUser from "../form/User/FormPatchUser";
import { RequestAuth } from "../middleware/auth";

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

  public async patch(req: RequestAuth, res: Response) {
    const query = (req.body as unknown as { firstname?: string, lastname?: string});
    const form = new FormPatchUser(query);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }
    const userPatched = req.user;
    userPatched.firstname = query.firstname;
    userPatched.lastname = query.lastname;
    const userPatchSaved = await this.userDao.update(userPatched);
    if (!userPatchSaved) {
      res.status(400).json({message: 'an error has occured'});
      return;
    }
    res.json({ user: userPatchSaved.userForResponse() })
  }
}