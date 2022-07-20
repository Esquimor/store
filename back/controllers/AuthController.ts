import {Request, Response} from 'express';
import UserDao from '../dao/UserDao';
import OrganizationDao from '../dao/OrganizationDao';
import { User } from '../entity/User';
import FormAuth from "../form/Auth/FormAuth";
import FormRegister from "../form/Auth/FormRegister";
import { comparePassword, generatePassword } from "../technical/password";
import { generateToken } from "../technical/token";
import { RequestAuth } from "../middleware/auth";
import { Organization } from '../entity/Organization';

export default class AuthController {

  private static userDao: UserDao = new UserDao();
  private static organizationDao: OrganizationDao = new OrganizationDao();


  public async auth(req: Request, res: Response) {
    const query = (req.body as unknown as { email?: string, password?: string});
    const form = new FormAuth(query);
    if (form.hasError()) {
      res.status(400).json({message: 'missing param'});
      return;
    }

    const { email, password } = form.getData();
    const user = await AuthController.userDao.getWithOrganizationByEmail(email);
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
      user: (user as unknown as User).userForResponse(),
      organization: user.organization,
    });
  }

  public async register(req: Request, res: Response) {
    const query = (req.body as unknown as { email?: string, password?: string});
    const form = new FormRegister(query);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }

    const { email, password, organization } = form.getData();
    const existingUser = await AuthController.userDao.getByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: "error"})
      return;
    }

    // Create Organization
    const userOrganization = new Organization();
    userOrganization.name = organization
    const organizationCreated = await AuthController.organizationDao.create(userOrganization);

    // Create User
    const generatedPassword = await generatePassword(password);
    const user = new User();
    user.initializeNewUser({ email, password: generatedPassword, organization: organizationCreated });
    const userCreated = await AuthController.userDao.create(user);

    if (!userCreated) {
      res.status(400).json({ message: "error"})
      return;
    }

    res.json({
      token:  generateToken(userCreated.id),
      user: userCreated.userForResponse(),
      organization: organizationCreated,
    })
  }

  public  me(req: RequestAuth, res: Response) {
    res.json({
      user: req.user.userForResponse(),
      organization: req.user.organization,
    })
  }
}