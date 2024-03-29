import { Entity, Column, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent, OneToMany, ManyToMany, JoinColumn, ManyToOne, JoinTable,  } from 'typeorm';
import { Attribut } from './Attribut';
import { FurnitureVersion } from './FurnitureVersion';
import { Organization } from './Organization';

@Entity()
@Tree("closure-table")
export class Category {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @TreeChildren()
    children: Category[];

    @TreeParent()
    parent: Category;

    @Column({ nullable: true })
    parentId: number;

    @OneToMany(() => FurnitureVersion, furnitureVersion => furnitureVersion.category, {
        cascade: true,
    })
    furnitureVersions: FurnitureVersion[];
    
    @ManyToMany(() => Attribut)
    @JoinTable()
    attributs: Attribut[]
    
    @ManyToOne(() => Organization, organization => organization.categories)
    @JoinColumn({ name: "organizationId" })
    organization: Organization;

    @Column({ nullable: false })
    organizationId: number;

    hasChildren() {
        if (!this.children) return false;
        return this.children.length !== 0
    }
}