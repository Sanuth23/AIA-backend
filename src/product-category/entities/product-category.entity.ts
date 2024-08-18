import { Exclude } from "class-transformer";
import { MemberReference } from "../../member-reference/entities/member-reference.entity";
import { Product } from "../../product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;


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
    @OneToMany(() => Product, (product) => product.productCategory)
    products: Product[];

    @Exclude()
    @OneToMany(() => MemberReference, (memberReference) => memberReference.productCategory)
    memberReferences: MemberReference[];
}
