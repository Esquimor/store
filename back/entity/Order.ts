import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ORDER } from '../../commons/Interface/Order'
import { OrderLine } from './OrderLine';
import { User } from './User';

@Entity()
export class Order {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        type: 'enum',
        enum: ORDER,
        default: ORDER.CREATED
    })
    status: ORDER;

    @ManyToOne(() => User, user => user.orders)
    user: User;

    @OneToMany(() => OrderLine, orderLine => orderLine.order)
    orderLines: OrderLine[];
}