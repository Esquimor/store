import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ROLE } from '../../commons/Interface/Role';
import { Furniture } from './Furniture';
import { Organization } from './Organization';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    email: string;

    @Column({
        nullable: true,
    })
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

    @Column({default: false})
    newUser: boolean;

    @ManyToOne(() => Organization, organization => organization.users)
    organization: Organization;
    
    @OneToMany(() => Furniture, furniture => furniture.organization, {
        cascade: true,
    })
    furnitures: Furniture[];

    initializeNewUser({ email, password, organization }: { email: string; password: string, organization: Organization}) {
        this.email = email;
        this.password = password;
        this.organization = organization
    }

    userForResponse() {
        return {
            id: this.id,
            email: this.email,
            firstname: this.firstname,
            lastname: this.lastname,
            phone: this.phone,
            role: this.role
        }
    }

    isAdmin() {
        return this.role === ROLE.ADMIN;
    }
}