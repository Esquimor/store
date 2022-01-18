import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Feature } from './Feature';
import { OrderLine } from './OrderLine';

@Entity()
export class OrderLineFeature {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column('simple-array')
    values: string[];

    @ManyToOne(() => OrderLine, orderLine => orderLine.orderLineFeatures)
    orderLine: OrderLine;

    @ManyToOne(() => Feature, feature => feature.orderLineFeatures)
    feature: Feature;
}