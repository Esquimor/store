import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { FurnitureVersion } from './FurnitureVersion';
import { User } from './User';

@Entity()
export class Inventory {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
      default: 1
    })
    quantity: number;

    @ManyToOne(() => User, user => user.inventories)
    user: User;

    @ManyToOne(() => FurnitureVersion, furnitureVersion => furnitureVersion.items)
    @JoinColumn({ name: "furnitureVersionId" })
    furnitureVersion: FurnitureVersion;

    @Column({ nullable: false })
    furnitureVersionId: number;

    inventoryForResponseWithFurnitureVersion() {
      return {
        id: this.id,
        quantity: this.quantity,
        furnitureVersion: this.furnitureVersion
      }
    }
}