import {Request, Response} from 'express';
import OrganizationDao from '../dao/OrganizationDao';
import FormPatchOrganization from "../form/Organization/FormPatchOrganization";
import { RequestAuth } from "../middleware/auth";

export default class OrganizationController {

  private organizationDao: OrganizationDao = new OrganizationDao();

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
}