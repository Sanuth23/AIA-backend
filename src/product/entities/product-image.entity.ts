import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity({ name: 'product_image' })
export class ProductImage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    path: string;

    @Column()
    productId: number;

    @ManyToOne(() => Product, (product) => product.productImages)
    @JoinColumn({ name: 'productId' })
    product: Product;
}