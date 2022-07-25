import { RequestAuth } from "./auth"

export const canUpdateOrder = (req: RequestAuth, res, next) => {
  if (req.user.isAdmin() || req.user.isValidator()) {
    next();
    return
  }
  res.status(401).send({ msg: 'Unauthorized' });
}