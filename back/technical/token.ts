const jwt = require("jsonwebtoken");
const dayjs = require('dayjs')

export const generateToken = (id: number) => {
  const payload = {
    iss: 'my.domain.com',
    sub: id,
    iat: dayjs().unix(),
    exp: dayjs().add(7, 'days').unix()
  };
  return jwt.sign(payload, process.env.SECRET);
}

export const decodeToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.SECRET);
  } catch (err) {
    return null;
  }
}