import {Request, Response} from "express";
import { User } from "../entity/User";
import { createConnection } from "typeorm";

export default class UserController {
  public async index(req: Request, res: Response) {
    const connection = await createConnection()
    const users = await connection.getRepository(User).find();
    if (!users) {
      res.status(400).json({message: "users not found"});
      return;
    }
    res.json(users)
  }
}