import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Feature } from "./Feature";

@Entity()
export class FeatureCategory {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Feature, feature => feature.featureCategory)
    features: Feature[];
}