import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { FurnitureVersion } from './FurnitureVersion';
import { Organization } from './Organization';

@Entity()
export class Tag {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Organization, organization => organization.tags)
    @JoinColumn({ name: "organizationId" })
    organization: Organization;

    @Column({ nullable: true })
    organizationId: number;

    tagForResponse() {
        return {
            id: this.id,
            name: this.name
        }
    }
}