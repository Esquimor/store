import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Address } from './Address';
import { Item } from './Item';
import { Organization } from './Organization';
import { Placement } from './Placement';
import { Tag } from './Tag';
import { User } from './User';

@Entity()
export class Inventory {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
      nullable: true
    })
    name: string;

    @ManyToOne(() => Organization, organization => organization.inventories, {
      nullable: true
    })
    organization: Organization;

    @ManyToOne(() => User, user => user.inventories, {
      nullable: true
    })
    user: User;

    @ManyToMany(() => Tag)
    @JoinTable()
    tags: Tag[];
    
    @OneToMany(() => Item, item => item.inventory, {
      cascade: true,
    })
    items: Item[];

    @ManyToOne(() => Address, address => address.inventories, {
      nullable: true
    })
    address: Address;

    @ManyToOne(() => Placement, placement => placement.inventories, {
      nullable: true
    })
    placement: Placement;

    setTags(tags: Tag[]) {
      this.tags = tags;
    }

    addTag(tag: Tag) {
      if (!this.tags) {
        this.tags = []
      }
      this.tags = [...this.tags, tag]
    }

    setItems(items: Item[]) {
      this.items = items;
    }

    addItem(item: Item) {
      if (!this.items) {
        this.items = []
      }
      this.items = [...this.items, item]
    }

    inventoryForResponse() {
      return {
        id: this.id,
        name: this.name
      }
    }
}