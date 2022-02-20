import {Request, Response} from 'express';
import UserDao from '../dao/UserDao';
import { User } from '../entity/User';
import FormAuth from "../form/FormAuth";
import FormRegister from "../form/FormRegister";
import { comparePassword, generatePassword } from "../technical/password";
import { decodeToken, generateToken } from "../technical/token";

export default class AuthController {

  private static userDao: UserDao = new UserDao();

  public async auth(req: Request, res: Response) {
    const query = (req.body as unknown as { email?: string, password?: string});
    const form = new FormAuth(query);
    if (form.hasError()) {
      res.status(400).json({message: 'missing param'});
      return;
    }

    const { email, password } = form.getData();
    const user = await AuthController.userDao.getByEmail(email);
    if (!user) {
      res.status(400).json({message: 'user not found'});
      return;
    }

    const matchPassword = comparePassword(password, (user as unknown as User).password)
    if (!matchPassword) {
      res.status(400).json({message: 'user not found'});
      return;
    }
    res.json({
      token: generateToken((user as unknown as User).id),
      user: (user as unknown as User).userForResponse()
    });
  }

  public async register(req: Request, res: Response) {
    const query = (req.body as unknown as { email?: string, password?: string});
    const form = new FormRegister(query);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }

    const { email, password } = form.getData();
    const existingUser = await AuthController.userDao.getByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: "error"})
      return;
    }
    const generatedPassword = await generatePassword(password);
    const user = new User();
    user.initializeNewUser({ email, password: generatedPassword });

    const userCreated = await AuthController.userDao.createUser(user);

    if (!userCreated) {
      res.status(400).json({ message: "error"})
      return;
    }

    res.json({
      token:  generateToken(userCreated.id),
      user: userCreated.userForResponse()
    })
  }

  public async me(req: Request, res: Response) {
    res.json({
      // @ts-ignore
      user: (req.user as unknown as User).userForResponse()
    })
  }
}