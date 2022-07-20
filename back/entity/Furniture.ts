import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Organization } from './Organization';
import { User } from './User';
import { FURNITURE_STATUS } from "../../commons/Interface/Furniture"

@Entity()
export class Furniture {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @Column("text")
    description: string

    @Column({
        type: 'enum',
        enum: FURNITURE_STATUS,
        default: FURNITURE_STATUS.CREATED,
        nullable: false,
    })
    status: FURNITURE_STATUS;

    @ManyToOne(() => Organization, organization => organization.furnitures)
    organization: Organization;

    @ManyToOne(() => User, user => user.furnitures)
    user: User;
}