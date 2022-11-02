import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, JoinColumn, CreateDateColumn } from 'typeorm';
import { Address } from './Address';
import { Item } from './Item';
import { Organization } from './Organization';
import { Placement } from './Placement';
import { Tag } from './Tag';
import { User } from './User';

@Entity()
export class Inventory {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @Column({
      nullable: true
    })
    name: string;

    @ManyToOne(() => Organization, organization => organization.inventories, {
      nullable: true
    })
    @JoinColumn({ name: "organizationId" })
    organization: Organization;

    @Column({ nullable: true })
    organizationId: number;

    @ManyToOne(() => User, user => user.inventories, {
      nullable: true
    })
    @JoinColumn({ name: "userId" })
    user: User;

    @Column({ nullable: true })
    userId: number;

    @ManyToMany(() => Tag)
    @JoinTable()
    tags: Tag[];
    
    @OneToMany(() => Item, item => item.inventory, {
      cascade: true,
    })
    items: Item[];

    @ManyToOne(() => Address, address => address.inventories, {
      nullable: true
    })
    @JoinColumn({ name: "addressId" })
    address: Address;

    @Column({ nullable: true })
    addressId: number;

    @ManyToOne(() => Placement, placement => placement.inventories, {
      nullable: true
    })
    @JoinColumn({ name: "placementId" })
    placement: Placement;

    @Column({ nullable: true })
    placementId: number;

    setTags(tags: Tag[]) {
      this.tags = tags;
    }

    addTag(tag: Tag) {
      if (!this.tags) {
        this.tags = []
      }
      this.tags = [...this.tags, tag]
    }

    setItems(items: Item[]) {
      this.items = items;
    }

    addItem(item: Item) {
      if (!this.items) {
        this.items = []
      }
      this.items = [...this.items, item]
    }

    inventoryForResponse() {
      return {
        id: this.id,
        name: this.name,
        address: this.address,
        user: this.user?.userForResponse(),
        placement: this.placement,
        items: this.items
      }
    }
}