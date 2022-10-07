import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Attribut } from './Attribut';
import { FurnitureVersion } from './FurnitureVersion';
import { Item } from './Item';

@Entity()
export class Variation {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Attribut, attribut => attribut.variations, {
        onDelete: "CASCADE"
      })
    @JoinColumn({ name: "attributId" })
    attribut: Attribut;

    @Column({ nullable: true })
    attributId: number;

    @ManyToMany(() => FurnitureVersion)
    @JoinTable()
    furnitureVersions: FurnitureVersion[]

    @ManyToMany(() => Item)
    @JoinTable()
    items: Item[]
}