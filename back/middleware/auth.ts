import { Request } from "express";
import UserDao from "../dao/UserDao";
import { User } from "../entity/User";
import { decodeToken } from "../technical/token";

export interface RequestAuth extends Request {
  user: User;
}

export const auth = async (req, res, next) => {
  const token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || "";

  const jwtDecoded = decodeToken(token)

  if (!!jwtDecoded) {
    const userDao = new UserDao();
    const user = await userDao.getWithOrganizationById(jwtDecoded.sub);
    if (user) {
      req.user = user;
      next();
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
}

export const authGraphql = async (req) => {
  const token = (req.headers.authorization && req.headers?.authorization.split(' ')[1]) || "";

  const jwtDecoded = decodeToken(token)
  

  if (!!jwtDecoded) {
    const userDao = new UserDao();
    const user = await userDao.getWithOrganizationById(jwtDecoded.sub);
    if (user) {
      return {
        user
      }
    }
  }
  return {
    user: null
  }
}