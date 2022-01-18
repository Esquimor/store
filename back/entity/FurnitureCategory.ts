import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Tree, TreeChildren, TreeParent } from 'typeorm';
import { Feature } from './Feature';
import { Furniture } from './Furniture';

@Entity()
@Tree('closure-table')
export class FurnitureCategory {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Furniture, furniture => furniture.furnitureCategory)
    furnitures: Furniture[];

    @TreeChildren()
    children: FurnitureCategory[];

    @TreeParent()
    parent: FurnitureCategory;
    type: string;

    @OneToMany(() => Feature, feature => feature.furnitureCategory)
    features: Feature[];
}