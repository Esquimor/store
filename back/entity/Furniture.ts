import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { FurnitureCategory } from "./FurnitureCategory";

@Entity()
export class Furniture {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => FurnitureCategory, furnitureCategory => furnitureCategory.furnitures)
    furnitureCategory: FurnitureCategory;
}