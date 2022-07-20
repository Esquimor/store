import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Furniture } from './Furniture';
import { User } from './User';

@Entity()
export class Organization {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @OneToMany(() => User, user => user.organization, {
        cascade: true,
    })
    users: User[];

    @OneToMany(() => Furniture, furniture => furniture.organization, {
        cascade: true,
    })
    furnitures: Furniture[];
}