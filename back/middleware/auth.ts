import UserDao from "../dao/UserDao";
import { decodeToken } from "../technical/token";

export const auth = async (req, res, next) => {
  const token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;

  const jwtDecoded = decodeToken(token)

  if (!!jwtDecoded) {
    const userDao = new UserDao();
    const user = await userDao.getById(jwtDecoded.sub);
    if (user) {
      req.user = user;
      next();
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
}