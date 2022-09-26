import dayjs = require('dayjs');
import shortUUID = require('short-uuid');
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { ROLE } from '../../commons/Interface/Role';
import { USER_STATUS } from '../../commons/Interface/User';
import { Address } from './Address';
import { FurnitureVersion } from './FurnitureVersion';
import { Inventory } from './Inventory';
import { Order } from './Order';
import { Organization } from './Organization';
import { Placement } from './Placement';

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

    @Column({
        type: 'enum',
        enum: USER_STATUS,
        default: USER_STATUS.CREATED,
        nullable: true,
    })
    status: USER_STATUS;

    @Column({
        type: 'timestamptz',
        nullable: true
    })
    timer: Date;

    @Column({
        nullable: true
    })
    code: string;

    @ManyToOne(() => Organization, organization => organization.users)
    organization: Organization;
    
    @OneToMany(() => Order, order => order.creator, {
        cascade: true,
    })
    orders: Order[];

    @OneToMany(() => FurnitureVersion, furnitureVersion => furnitureVersion.user, {
        cascade: true,
    })
    furnitureVersions: FurnitureVersion[];
    
    @OneToMany(() => Inventory, inventory => inventory.user, {
      cascade: true,
    })
    inventories: Inventory[];

    @OneToOne(() => Address, {
        nullable: true
    })
    @JoinColumn()
    address: Address;

    @OneToOne(() => Placement, {
        nullable: true
    })
    @JoinColumn()
    placement: Placement;

    initializeNewUser({ email, password, organization }: { email: string; password: string, organization: Organization}) {
        this.email = email;
        this.password = password;
        this.organization = organization;
        this.setTimer()
    }

    setTimer({time} = { time: 7}) {
        this.timer = dayjs().add(time, 'day').toDate();
        this.code = shortUUID.generate();
    }

    userForResponse() {
        return {
            id: this.id,
            email: this.email,
            firstname: this.firstname,
            lastname: this.lastname,
            phone: this.phone,
            role: this.role,
            placement: this.placement || null,
            address: this.address || null
        }
    }

    isAdmin() {
        return this.role === ROLE.ADMIN;
    }

    isValidator() {
        return this.role === ROLE.VALIDATOR;
    }
}