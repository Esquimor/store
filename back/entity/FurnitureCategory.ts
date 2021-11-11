import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FurnitureCategory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}