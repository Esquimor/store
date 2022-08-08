import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
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
    order: Order;

    @ManyToOne(() => Inventory, inventory => inventory.items, {
      nullable: true
    })
    inventory: Inventory;

    @ManyToOne(() => FurnitureVersion, furnitureVersion => furnitureVersion.items)
    @JoinColumn({ name: "furnitureVersionId" })
    furnitureVersion: FurnitureVersion;

    @Column({ nullable: false })
    furnitureVersionId: number;
    
    @ManyToMany(() => Variation)
    @JoinColumn()
    variations: Variation[]
}