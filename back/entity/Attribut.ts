import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne, JoinColumn, JoinTable } from 'typeorm';
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
  @JoinTable()
  categories: Category[]

  @ManyToMany(() => FurnitureVersion)
  @JoinTable()
  furnitureVersions: FurnitureVersion[]

  @ManyToOne(() => Organization, organization => organization.attributs)
  @JoinColumn({ name: "organizationId" })
  organization: Organization;

  @Column({ nullable: false })
  organizationId: number;

  addVariation(variation: Variation) {
    if (!this.variations) {
      this.variations = []
    }
    this.variations = [...this.variations, variation]
  }
}