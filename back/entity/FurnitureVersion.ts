import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Attribut } from './Attribut';
import { Category } from './Category';
import { Furniture } from './Furniture';
import { Item } from './Item';
import { Tag } from './Tag';
import { User } from './User';
import { Variation } from './Variation';

@Entity()
export class FurnitureVersion {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    name: string;

    @Column("text")
    description: string;

    @OneToMany(() => Item, item => item.furnitureVersion, {
        cascade: true,
    })
    items: Item[];

    @ManyToOne(() => Furniture, furniture => furniture.furnitureVersions)
    furniture: Furniture;

    @ManyToOne(() => User, user => user.furnitureVersions)
    user: User;

    @ManyToMany(() => Tag)
    @JoinTable()
    tags: Tag[];

    @ManyToOne(() => Category, category => category.furnitureVersions)
    category: Category;
    
    @ManyToMany(() => Attribut)
    @JoinColumn()
    attributs: Attribut[]
    
    @ManyToMany(() => Variation)
    @JoinColumn()
    variations: Variation[]

    furnitureVersionForResponse() {
        return {
            id: this.id,
            created_at: this.created_at,
            name: this.name,
            description: this.description
        }
    }
}