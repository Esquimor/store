import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Organization } from './Organization';
import { User } from './User';
import { ORDER_STATUS } from "../../commons/Interface/Order"
import { Furniture } from './Furniture';

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
    user: User;
    
    @OneToMany(() => Furniture, furniture => furniture.order, {
      cascade: true,
    })
    furnitures: Furniture[];
}