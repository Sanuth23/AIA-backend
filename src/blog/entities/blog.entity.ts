import { Exclude } from "class-transformer";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BlogImage } from "./blog-image.entity";

@Entity({ name: 'blog' })
export class Blog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    topic: string;

    @Column()
    description: string;

    @Column()
    adminId: number;


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
    @OneToMany(() => BlogImage, (blogImage) => blogImage.blogs)
    blogImages: BlogImage[];

    // @ManyToOne(() => Admin, (admin) => admin.blog)
    // @JoinColumn({name:'adminId'})
    // admin: Admin;
}
