import {getConnection} from 'typeorm';

export default class Dao<T> {

  entity;

  constructor(entity) {
    this.entity = entity;
  }

  async getAll() {
    const items = await getConnection().getRepository(this.entity).find();
    if (!items) return null;
    return items;
  }
  
  async getById(id: string) {
    const item = await getConnection().getRepository(this.entity).findOne(id);
    if (!item) return null;
    return item;
  }

  async create(element: T) {
    const newElement = getConnection().getRepository(this.entity).save(element);
    if (!newElement) return null;
    return newElement;
  }

  async deleteById(id: string) {
    const success = await getConnection().getRepository(this.entity).delete(id);
    if(!success) return false;
    return true;
  }

  async update(item: T) {
    const itemUpdated = await getConnection().getRepository(this.entity).save(item);
    if (!itemUpdated) return null;
    return itemUpdated;
  }
}