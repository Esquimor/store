import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Organization } from './Organization';
import { User } from './User';

@Entity()
export class Inventory {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
      nullable: true
    })
    label: string;

    @Column({
      nullable: true
    })
    link: string;

    @ManyToOne(() => Organization, organization => organization.inventories, {
      nullable: true
    })
    @JoinColumn({ name: "organizationId" })
    organization: Organization;

    @Column({ nullable: true })
    organizationId: number;

    @ManyToOne(() => User, user => user.inventories, {
      nullable: true
    })
    @JoinColumn({ name: "userId" })
    user: User;

    @Column({ nullable: true })
    userId: number;
}