import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Address } from './Address';
import { Attribut } from './Attribut';
import { Category } from './Category';
import { Furniture } from './Furniture';
import { Inventory } from './Inventory';
import { Order } from './Order';
import { Tag } from './Tag';
import { User } from './User';

@Entity()
export class Organization {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @Column({
        default: "sk"
    })
    stripe: string;

    @Column({ type: 'timestamptz', default: "2022-07-30 10:57:03.992001" }) // Recommended
    strip_end: Date;

    @OneToMany(() => User, user => user.organization, {
        cascade: true,
    })
    users: User[];

    @OneToMany(() => Order, order => order.organization, {
        cascade: true,
    })
    orders: Order[];

    @OneToMany(() => Furniture, furniture => furniture.organization, {
        cascade: true,
    })
    furnitures: Furniture[];

    @OneToMany(() => Address, address => address.organization, {
        cascade: true,
    })
    addresses: Address[];

    @OneToOne(() => Address, {
        nullable: true
    })
    @JoinColumn()
    addressMain: Address;

    @OneToMany(() => Tag, tag => tag.organization, {
        cascade: true,
    })
    tags: Tag[];
    
    @OneToMany(() => Inventory, inventory => inventory.organization, {
      cascade: true,
    })
    inventories: Inventory[];
    
    @OneToMany(() => Category, category => category.organization, {
      cascade: true,
    })
    categories: Category[];
    
    @OneToMany(() => Attribut, attribut => attribut.organization, {
      cascade: true,
    })
    attributs: Attribut[];

    organizationForResponse() {
        return {
            id: this.id,
            name: this.name
        }
    }
}