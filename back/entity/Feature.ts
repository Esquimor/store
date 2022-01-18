import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { FeatureCategory } from './FeatureCategory';
import { FurnitureCategory } from './FurnitureCategory';
import { OrderLineFeature } from './OrderLineFeature';

@Entity()
export class Feature {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @Column('simple-array')
    values: string[];

    @Column()
    type: string;

    @OneToMany(() => OrderLineFeature, orderLineFeature => orderLineFeature.feature)
    orderLineFeatures: OrderLineFeature[];

    @ManyToOne(() => FeatureCategory, featureCategory => featureCategory.features)
    featureCategory: FeatureCategory;

    @ManyToOne(() => FurnitureCategory, furnitureCategory => furnitureCategory.furnitures)
    furnitureCategory: FurnitureCategory;
}