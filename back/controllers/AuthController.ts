import {Request, Response} from 'express';
import UserDao from '../dao/UserDao';
import OrganizationDao from '../dao/OrganizationDao';
import { User } from '../entity/User';
import FormAuth from "../form/Auth/FormAuth";
import FormRegister from "../form/Auth/FormRegister";
import FormPasswordForgotten from "../form/Auth/FormPasswordForgotten";
import FormResetPassword from "../form/Auth/FormResetPassword";
import FormRegisterValidated from "../form/Auth/FormRegisterValidated";
import { comparePassword, generatePassword } from "../technical/password";
import { generateToken } from "../technical/token";
import { RequestAuth } from "../middleware/auth";
import { Organization } from '../entity/Organization';
import { createCustomer, createSubscription } from "../technical/stripe";
import { USER_STATUS } from '../../commons/Interface/User';

const dayjs = require('dayjs')

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
    const user = await AuthController.userDao.getUserRegisteredWithOrganizationByEmail(email);
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
      organization: user.organization.organizationForResponse(),
    });
  }

  public async register(req: Request, res: Response) {
    const query = (req.body as unknown as { email?: string, password?: string, tokenId: string});
    const form = new FormRegister(query);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }

    const { email, password, organization, tokenId } = form.getData();
    const existingUser = await AuthController.userDao.getByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: "error"})
      return;
    }

    // Create Organization
    const userOrganization = new Organization();
    userOrganization.name = organization

    /*
    const customer = await createCustomer({token: tokenId, email});
    const subscription = await createSubscription({customerId: customer.id, price: 500, quantity: 1})

    userOrganization.stripe = subscription.id
    userOrganization.strip_end = dayjs(subscription.current_period_end * 1_000 + 3600*24*3)
*/
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
      organization: organizationCreated.organizationForResponse(),
    })
  }

  public  me(req: RequestAuth, res: Response) {
    res.json({
      user: req.user.userForResponse(),
      organization: req.user.organization.organizationForResponse(),
    })
  }

  public async passwordForgotten(req: Request, res: Response) {
    const query = (req.body as unknown as { email?: string});
    const form = new FormPasswordForgotten(query);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }

    const existingUser = await AuthController.userDao.getByEmail(query.email);
    if (!existingUser) {
      res.status(400).json({ message: "error"})
      return;
    }
    
    existingUser.setTimer();

    const userPatchSaved = await AuthController.userDao.update(existingUser);
    if (!userPatchSaved) {
      res.status(400).json({message: 'an error has occured'});
      return;
    }

    res.json({
      message: "ok"
    })
  }

  public async resetPassword(req: Request, res: Response) {
    const body = (req.body as unknown as { email: string; code: string; password: string;})
    const form = new FormResetPassword(body);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }

    const existingUser = await AuthController.userDao.getByEmailAndCode(body.email, body.code);
    if (!existingUser) {
      res.status(400).json({message: 'an error has occured'});
      return;
    }
    existingUser.password = await generatePassword(body.password);
    

    const userPatchSaved = await AuthController.userDao.update(existingUser);
    if (!userPatchSaved) {
      res.status(400).json({message: 'an error has occured'});
      return;
    }

    res.json({
      token:  generateToken(userPatchSaved.id),
      user: userPatchSaved.userForResponse(),
      organization: userPatchSaved.organization.organizationForResponse(),
    })
  }

  public async registerValidated(req: Request, res: Response) {
    const body = (req.body as unknown as { email: string; code: string;})
    const form = new FormRegisterValidated(body);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }

    const existingUser = await AuthController.userDao.getByEmailAndCode(body.email, body.code);
    if (!existingUser) {
      res.status(400).json({message: 'an error has occured'});
      return;
    }

    existingUser.status = USER_STATUS.REGISTERED;
    
    const userPatchSaved = await AuthController.userDao.update(existingUser);
    if (!userPatchSaved) {
      res.status(400).json({message: 'an error has occured'});
      return;
    }

    res.json({
      token:  generateToken(userPatchSaved.id),
      user: userPatchSaved.userForResponse(),
      organization: userPatchSaved.organization.organizationForResponse(),
    })
  }
}