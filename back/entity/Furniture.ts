import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, Column, JoinColumn } from 'typeorm';
import { FurnitureVersion } from './FurnitureVersion';
import { Organization } from './Organization';

@Entity()
export class Furniture {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @OneToMany(() => FurnitureVersion, furnitureVersion => furnitureVersion.furniture, {
        cascade: true,
    })
    furnitureVersions: FurnitureVersion[];

    @ManyToOne(() => Organization, organization => organization.furnitures)
    @JoinColumn({ name: "organizationId" })
    organization: Organization;

    @Column({ nullable: false })
    organizationId: number;

    addFurnitureVersion(furnitureVersion: FurnitureVersion) {
        if (!this.furnitureVersions || this.furnitureVersions.length === 0) {
            this.furnitureVersions = [furnitureVersion]
            return; 
        }
        this.furnitureVersions = [...this.furnitureVersions, furnitureVersion]
    }

    furnitureForResponseWithFurnitureVersion() {
        return {
            id: this.id,
            furnitureVersions: this.furnitureVersions.map(fur => fur.furnitureVersionForResponse())
        }
    }
}