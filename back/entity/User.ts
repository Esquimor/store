import { Entity, Column } from "typeorm";

@Entity()
export class User {

    @Column()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    firstname: string;

    @Column()
    lastname: number;

    @Column()
    phone: boolean;
}