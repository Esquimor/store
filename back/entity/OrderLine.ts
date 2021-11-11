import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderLine {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;
}