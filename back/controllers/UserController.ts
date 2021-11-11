import {Request, Response} from "express";
import UserDao from "../dao/UserDao";

export default class UserController {

  public async index(req: Request, res: Response) {
    const users = await UserDao.getAll();
    if (!users) {
      res.status(400).json({message: "users not found"});
      return;
    }
    res.json(users)
  }
}