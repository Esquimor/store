import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Inventory } from './Inventory';
import { Order } from './Order';
import { Organization } from './Organization';
import { Placement } from './Placement';

@Entity()
export class Address {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @Column({
      nullable: true
    })
    number: string;

    @Column({
      nullable: true
    })
    ligne1: string;

    @Column({
      nullable: true
    })
    ligne2: string;

    @Column({
      nullable: true
    })
    city: string;

    @Column({
      nullable: true
    })
    zipCode: string;

    @Column({
      nullable: true
    })
    country: string;

    @Column({
      nullable: true
    })
    comment: string;

    @OneToMany(() => Placement, placement => placement.address, {
        cascade: true,
    })
    placements: Placement[];

    @ManyToOne(() => Organization, organization => organization.addresses)
    organization: Organization;
    
    @OneToMany(() => Inventory, inventory => inventory.address, {
      cascade: true,
    })
    inventories: Inventory[];
    
    @OneToMany(() => Order, order => order.address, {
      cascade: true,
    })
    orders: Order[];

    addressForResponse() {
      return {
          id: this.id,
          name: this.name,
          number: this.number,
          ligne1: this.ligne1,
          ligne2: this.ligne2,
          city: this.city,
          zipCode: this.zipCode,
          country: this.country,
          comment: this.comment
      }
  }
}