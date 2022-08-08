import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
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

    inventoryForResponseWithFurnitureVersion() {
      return {
        id: this.id,
      }
    }
}