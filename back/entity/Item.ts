import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { ITEM_STATUS } from "../../commons/Interface/Item"
import { FurnitureVersion } from './FurnitureVersion';
import { Inventory } from './Inventory';
import { Order } from './Order';
import { Variation } from './Variation';

@Entity()
export class Item {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        type: 'enum',
        enum: ITEM_STATUS,
        default: ITEM_STATUS.WANTED,
        nullable: false,
    })
    status: ITEM_STATUS;

    @ManyToOne(() => Order, order => order.items, {
      nullable: true
    })
    @JoinColumn({ name: "orderId" })
    order: Order;

    @Column({ nullable: true })
    orderId: number;

    @ManyToOne(() => Inventory, inventory => inventory.items, {
      nullable: true
    })
    @JoinColumn({ name: "inventoryId" })
    inventory: Inventory;

    @Column({ nullable: true })
    inventoryId: number;

    @ManyToOne(() => FurnitureVersion, furnitureVersion => furnitureVersion.items)
    @JoinColumn({ name: "furnitureVersionId" })
    furnitureVersion: FurnitureVersion;

    @Column({ nullable: false })
    furnitureVersionId: number;
    
    @ManyToMany(() => Variation)
    @JoinTable()
    variations: Variation[]
}