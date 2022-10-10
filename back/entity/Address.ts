import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
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
    number: string | null;

    @Column({
      nullable: true
    })
    ligne1: string | null;

    @Column({
      nullable: true
    })
    ligne2: string | null;

    @Column({
      nullable: true
    })
    city: string | null;

    @Column({
      nullable: true
    })
    zipCode: string | null;

    @Column({
      nullable: true
    })
    country: string | null;

    @Column({
      nullable: true
    })
    comment: string | null;

    @OneToMany(() => Placement, placement => placement.address, {
      cascade: true
    })
    placements: Placement[];

    @ManyToOne(() => Organization, organization => organization.addresses)
    @JoinColumn({ name: "organizationId" })
    organization: Organization;

    @Column({ nullable: false })
    organizationId: number;
    
    @OneToMany(() => Inventory, inventory => inventory.address, {
      cascade: true,
      onDelete: "SET NULL"
    })
    inventories: Inventory[];
    
    @OneToMany(() => Order, order => order.address, {
      cascade: true,
      onDelete: "SET NULL"
    })
    orders: Order[];

    addPlacement(placement: Placement) {
      if (!this.placements) {
        this.placements = []
      }
      this.placements = [...this.placements, placement]
    }

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
          comment: this.comment,
          placements: this.placements?.map(placement => placement.placementForResponse()) || []
      }
  }
}