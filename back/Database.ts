import { createConnection } from 'typeorm';

class Database {
  connection;

  constructor(){
  }

  async createConnection() {
    this.connection = await createConnection()
  }

  getConnection() {
    return this.connection;
  }
}

const instance = new Database();
instance.createConnection();

export default instance.getConnection();
