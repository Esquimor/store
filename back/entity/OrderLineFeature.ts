import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderLineFeature {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    values: string;
}