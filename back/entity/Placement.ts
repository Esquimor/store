import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Address } from './Address';
import { Inventory } from './Inventory';
import { Order } from './Order';

@Entity()
export class Placement {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Address, address => address.placements)
    address: Address;
    
    @OneToMany(() => Inventory, inventory => inventory.placement, {
      cascade: true,
    })
    inventories: Inventory[];
    
    @OneToMany(() => Order, order => order.placement, {
      cascade: true,
    })
    orders: Order[];
}