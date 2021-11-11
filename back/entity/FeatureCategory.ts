import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FeatureCategory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}