import {Response} from 'express';
import OrganizationDao from '../dao/OrganizationDao';
import UserDao from '../dao/UserDao';
import { User } from '../entity/User';
import FormPatchOrganization from "../form/Organization/FormPatchOrganization";
import { RequestAuth } from "../middleware/auth";

export default class OrganizationController {

  private organizationDao: OrganizationDao = new OrganizationDao();
  private userDao: UserDao = new UserDao();

  public async patch(req: RequestAuth, res: Response) {
    const query = (req.body as unknown as { name?: string });
    const form = new FormPatchOrganization(query);
    if (form.hasError()) {
      res.status(400).json({message: "missing param"})
      return;
    }
    const organizationPatched = req.user.organization;
    organizationPatched.name = query.name;
    const organizationSaved = await this.organizationDao.update(organizationPatched);
    if (!organizationSaved) {
      res.status(400).json({message: 'an error has occured'});
      return;
    }
    res.json({ organization: organizationSaved })
  }

  public async getUsersOfMyOrganization(req: RequestAuth, res: Response) { 
    const user = req.user;
    const users = await this.userDao.getUsersInOrganization(user.organization)
    if (!users) {
      res.status(400).json({message: 'an error has occured'});
      return;
    }
    res.json({users: (users as unknown as User[]).map(user => user.userForResponse())})
  }
}