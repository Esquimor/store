import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn } from 'typeorm';
import { Furniture } from './Furniture';
import { Item } from './Item';
import { User } from './User';

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

    furnitureVersionForResponse() {
        return {
            id: this.id,
            created_at: this.created_at,
            name: this.name,
            description: this.description
        }
    }
}