import { Exclude } from "class-transformer";
import { ProductCategory } from "../../product-category/entities/product-category.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    categoryId: number;


    @Column()
    createdBy: number;

    @Column()
    updatedBy: number;

    @Column()
    deletedBy: number;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @Column()
    deletedAt: Date;

    @Exclude()
    @OneToMany(() => ProductImage, (productImage) => productImage.product)
    productImages: ProductImage[];

    @ManyToOne(() => ProductCategory, (productCategory) => productCategory.products)
    @JoinColumn({name:'categoryId'})
    productCategory: ProductCategory;
}

