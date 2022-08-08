import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Organization } from './Organization';
import { User } from './User';
import { ORDER_STATUS } from "../../commons/Interface/Order"
import { Item } from './Item';
import { Address } from './Address';
import { Placement } from './Placement';

@Entity()
export class Order {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
      default: ""
    })
    name: string;

    @Column({
        name: "order_status",
        type: 'enum',
        enum: ORDER_STATUS,
        default: ORDER_STATUS.CREATED,
        nullable: false,
    })
    status: ORDER_STATUS;

    @ManyToOne(() => Organization, organization => organization.orders)
    organization: Organization;

    @ManyToOne(() => User, user => user.orders)
    creator: User;
    
    @OneToMany(() => Item, item => item.order, {
      cascade: true,
    })
    items: Item[];

    @ManyToOne(() => Address, address => address.orders, {
      nullable: true
    })
    address: Address;

    @ManyToOne(() => Placement, placement => placement.orders, {
      nullable: true
    })
    placement: Placement;

    orderForResponseWithItemsAndCreator() {
      return {
        items: this.items, 
        id: this.id, 
        name: this.name, 
        status: this.status, 
        creator: this.creator.userForResponse()
      }
    }
}