import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { FURNITURE_STATUS } from "../../commons/Interface/Furniture"
import { Order } from './Order';

@Entity()
export class Furniture {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @Column("text")
    description: string

    @Column({
        type: 'enum',
        enum: FURNITURE_STATUS,
        default: FURNITURE_STATUS.WANTED,
        nullable: false,
    })
    status: FURNITURE_STATUS;

    @ManyToOne(() => Order, order => order.furnitures)
    order: Order;
}