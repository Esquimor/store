import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Attribut } from './Attribut';
import { Category } from './Category';
import { Furniture } from './Furniture';
import { Item } from './Item';
import { Tag } from './Tag';
import { User } from './User';
import { Variation } from './Variation';
import { Media } from "./Media";

@Entity()
export class FurnitureVersion {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    name: string;

    @Column("text", {
      nullable: true
    })
    description: string | null;

    @OneToMany(() => Item, item => item.furnitureVersion, {
        cascade: true,
    })
    items: Item[];

    @ManyToOne(() => Furniture, furniture => furniture.furnitureVersions)
    @JoinColumn({ name: "furnitureId" })
    furniture: Furniture;

    @Column({ nullable: false })
    furnitureId: number;

    @ManyToOne(() => User, user => user.furnitureVersions)
    @JoinColumn({ name: "userId" })
    user: User;

    @Column({ nullable: false })
    userId: number;

    @ManyToMany(() => Tag)
    @JoinTable()
    tags: Tag[];

    @ManyToOne(() => Category, category => category.furnitureVersions)
    @JoinColumn({ name: "categoryId" })
    category: Category;

    @Column({ nullable: true })
    categoryId: number;
    
    @ManyToMany(() => Attribut)
    @JoinTable()
    attributs: Attribut[]
    
    @ManyToMany(() => Variation)
    @JoinTable()
    variations: Variation[]

    @OneToMany(() => Media, media => media.furnitureVersion, {
        cascade: true,
    })
    medias: Media[];

    addAttribut(attribut: Attribut) {
        if (!this.attributs || this.attributs.length === 0) {
            this.attributs = [attribut]
            return; 
        }
        this.attributs = [...this.attributs, attribut]
    }

    resetAttributs() {
        this.attributs = [];
    }

    furnitureVersionForResponse() {
        return {
            id: this.id,
            created_at: this.created_at,
            name: this.name,
            description: this.description
        }
    }

    addMedia(media: Media) {
        if (!this.medias || this.medias.length === 0) {
            this.medias = [media]
            return; 
        }
        this.medias = [...this.medias, media]
    }

    resetMedias() {
        this.medias = [];
    }
}