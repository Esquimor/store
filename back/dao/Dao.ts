import {getConnection} from 'typeorm';

export default class Dao<T> {

  entity;

  constructor(entity) {
    this.entity = entity;
  }

  async getAll() {
    const items = await getConnection().getRepository(this.entity).find();
    if (!items) return null;
    return (items as unknown as T[]);
  }
  
  async getById(id: string) {
    const item = await getConnection().getRepository(this.entity).findOne(id);
    if (!item) return null;
    return (item as unknown as T);
  }

  async create(element: T) {
    const newElement = await getConnection().getRepository(this.entity).save(element);
    if (!newElement) return null;
    return (newElement as unknown as T);
  }

  async deleteById(id: string|number) {
    const success = await getConnection().getRepository(this.entity).delete(id);
    if(!success) return false;
    return true;
  }

  async update(item: T) {
    const itemUpdated = await getConnection().getRepository(this.entity).save(item);
    if (!itemUpdated) return null;
    return (itemUpdated as unknown as T);
  }
}