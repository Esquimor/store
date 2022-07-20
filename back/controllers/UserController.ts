import {Request, Response} from 'express';
import UserDao from '../dao/UserDao';
import FormPatchUser from "../form/User/FormPatchUser";
import { RequestAuth } from "../middleware/auth";
import FormCreateUserInSameOrganization from "../form/User/FormCreateUserInSameOrganization"
import FormPatchRoleUserInSameOrganization from "../form/User/FormPatchRoleUserInSameOrganization";
import FormDeleteUserInSameOrganization from "../form/User/FormDeleteUserInSameOrganization";
import { ROLE } from '../../commons/Interface/Role';
import {User} from "../entity/User"

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

  public async createUserInSameOrganization(req: RequestAuth, res: Response) {
    const query = (req.body as unknown as { email: string, firstname?: string; lastname?: string; role: ROLE});
    const form = new FormCreateUserInSameOrganization(query);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }
    
    const existingUser = await this.userDao.getByEmail(query.email);
    if (existingUser) {
      res.status(400).json({ message: "error"})
      return;
    }

    const user = req.user;
    const newUser = new User();
    newUser.email = query.email;
    newUser.firstname = query.firstname;
    newUser.lastname = query.lastname;
    newUser.role = query.role
    newUser.organization = user.organization
    newUser.newUser = true;

    const userCreated = await this.userDao.create(newUser);
    if (!userCreated) {
      res.status(400).json({ message: "error"})
      return;
    }

    res.json({
      user: userCreated.userForResponse(),
    })
  }

  public async patchUserRoleInSameOrganization(req: RequestAuth, res: Response) {
    const query = (req.body as unknown as { role: ROLE; userId: string; });
    const form = new FormPatchRoleUserInSameOrganization(query);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }
    const userToPatch = await this.userDao.getWithOrganizationById(query.userId) as User;
    if (!userToPatch) {
      res.status(400).json({ message: "error"})
      return;
    }

    if (req.user.organization.id !== userToPatch.organization.id) {
      res.status(400).json({ message: "error"})
      return;
    }

    userToPatch.role = query.role;

    const userPatchSaved = await this.userDao.update(userToPatch);
    if (!userPatchSaved) {
      res.status(400).json({message: 'an error has occured'});
      return;
    }
    res.json({ user: userPatchSaved.userForResponse() })
  }

  public async deleteUserInSameOrganization(req: RequestAuth, res: Response) {
    const query = (req.query as unknown as { userId: string; });
    const form = new FormDeleteUserInSameOrganization(query);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }
    const isDeleted = await this.userDao.deleteById(query.userId);
    if (!isDeleted) {
      res.status(400).json({ message: "error"})
      return;
    }
    res.json({ deleted: true })
  }
}