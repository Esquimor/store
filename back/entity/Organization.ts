import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Furniture } from './Furniture';
import { Order } from './Order';
import { User } from './User';

@Entity()
export class Organization {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @Column({
        default: "sk"
    })
    stripe: string;

    @Column({ type: 'timestamptz', default: "2022-07-30 10:57:03.992001" }) // Recommended
    strip_end: Date;

    @OneToMany(() => User, user => user.organization, {
        cascade: true,
    })
    users: User[];

    @OneToMany(() => Order, order => order.organization, {
        cascade: true,
    })
    orders: Order[];

    @OneToMany(() => Furniture, furniture => furniture.organization, {
        cascade: true,
    })
    furnitures: Furniture[];

    organizationForResponse() {
        return {
            id: this.id,
            name: this.name
        }
    }
}