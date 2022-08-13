import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { FurnitureVersion } from './FurnitureVersion';
import { Organization } from './Organization';

@Entity()
export class Tag {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Organization, organization => organization.tags)
    organization: Organization;

    tagForResponse() {
        return {
            id: this.id,
            name: this.name
        }
    }
}