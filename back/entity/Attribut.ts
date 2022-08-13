import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import { Category } from './Category';
import { FurnitureVersion } from './FurnitureVersion';
import { Organization } from './Organization';
import { Variation } from './Variation';

@Entity()
export class Attribut {

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;
  
  @OneToMany(() => Variation, variation => variation.attribut, {
    cascade: true,
  })
  variations: Variation[];

  @ManyToMany(() => Category)
  categories: Category[]

  @ManyToMany(() => FurnitureVersion)
  furnitureVersions: FurnitureVersion[]

  @ManyToOne(() => Organization, organization => organization.attributs)
  organization: Organization;
}