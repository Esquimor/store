import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Model {

    @PrimaryGeneratedColumn()
    id: number;
}