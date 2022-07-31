import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ITEM_STATUS } from "../../commons/Interface/Item"
import { FurnitureVersion } from './FurnitureVersion';
import { Order } from './Order';

@Entity()
export class Item {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
      default: 1
    })
    quantity: number;

    @Column({
        type: 'enum',
        enum: ITEM_STATUS,
        default: ITEM_STATUS.WANTED,
        nullable: false,
    })
    status: ITEM_STATUS;

    @ManyToOne(() => Order, order => order.items)
    order: Order;

    @ManyToOne(() => FurnitureVersion, furnitureVersion => furnitureVersion.items)
    @JoinColumn({ name: "furnitureVersionId" })
    furnitureVersion: FurnitureVersion;

    @Column({ nullable: false })
    furnitureVersionId: number;
}