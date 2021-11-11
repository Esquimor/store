import { Entity, Column } from "typeorm";

@Entity()
export class Organization {

    @Column()
    id: number;

    @Column()
    name: string;
}