import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ROLE } from '../../commons/Interface/Role';
import { Order } from './Order';
import { Organization } from './Organization';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        nullable: true,
    })
    firstname: string;

    @Column({
        nullable: true,
    })
    lastname: string;

    @Column({
        nullable: true,
    })
    phone: boolean;

    @Column({
        type: 'enum',
        enum: ROLE,
        default: ROLE.ADMIN,
        nullable: true,
    })
    role: ROLE;

    @ManyToOne(() => Organization, organization => organization.users)
    organization: Organization;

    @OneToMany(() => Order, order => order.user)
    orders: Order[];

    initializeNewUser({ email, password }: { email: string; password: string}) {
        this.email = email;
        this.password = password;
    }

    userForResponse() {
        return {
            id: this.id,
            email: this.email,
            firstname: this.firstname,
            lastname: this.lastname,
            phone: this.phone,
        }
    }
}