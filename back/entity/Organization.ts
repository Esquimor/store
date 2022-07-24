import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from './Order';
import { User } from './User';

@Entity()
export class Organization {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @OneToMany(() => User, user => user.organization, {
        cascade: true,
    })
    users: User[];

    @OneToMany(() => Order, order => order.organization, {
        cascade: true,
    })
    orders: Order[];
}