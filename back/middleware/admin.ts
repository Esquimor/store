import { RequestAuth } from "./auth"

export const admin = (req: RequestAuth, res, next) => {
  if (req.user.isAdmin()) {
    next();
    return
  }
  res.status(401).send({ msg: 'Unauthorized' });
}