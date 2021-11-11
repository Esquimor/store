import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Feature {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    values: string;

    @Column()
    type: string;
}