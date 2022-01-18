import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Order } from './Order';
import { OrderLineFeature } from './OrderLineFeature';

@Entity()
export class OrderLine {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Order, order => order.orderLines)
    order: Order;

    @OneToMany(() => OrderLineFeature, orderLineFeature => orderLineFeature.orderLine)
    orderLineFeatures: OrderLineFeature[];
}