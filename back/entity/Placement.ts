import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Address } from './Address';
import { Inventory } from './Inventory';
import { Order } from './Order';

@Entity()
export class Placement {

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Address, address => address.placements, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "addressId" })
  address: Address;

  @Column({ nullable: false })
  addressId: number;
  
  @OneToMany(() => Inventory, inventory => inventory.placement, {
    cascade: true,
  })
  inventories: Inventory[];
  
  @OneToMany(() => Order, order => order.placement, {
    cascade: true,
  })
  orders: Order[];

  placementForResponse() {
    return {
      id: this.id,
      name: this.name,
    }
  }
}