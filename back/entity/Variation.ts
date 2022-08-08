import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
import { Attribut } from './Attribut';
import { FurnitureVersion } from './FurnitureVersion';
import { Item } from './Item';

@Entity()
export class Variation {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Attribut, attribut => attribut.variations)
    attribut: Attribut;

    @ManyToMany(() => FurnitureVersion)
    furnitureVersions: FurnitureVersion[]

    @ManyToMany(() => Item)
    items: Item[]
}