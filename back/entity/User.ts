import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { ROLE } from "../../commons/Interface/Role";
import { Order } from "./Order";
import { Organization } from "./Organization";

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
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

    @Column({
        type: "enum",
        enum: ROLE,
        default: ROLE.ADMIN
    })
    role: ROLE;

    @ManyToOne(() => Organization, organization => organization.users)
    organization: Organization;

    @OneToMany(() => Order, order => order.user)
    orders: Order[];
}