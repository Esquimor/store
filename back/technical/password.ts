const bcrypt = require('bcrypt');

export const comparePassword = async (plainTextPassword: string, encryptedPassword: string):Promise<boolean> => {
  return await bcrypt.compare(plainTextPassword, encryptedPassword);
};

export const generatePassword = (plainTextPassword: string):Promise<string> => {
  return bcrypt.hash(plainTextPassword, 5);
}