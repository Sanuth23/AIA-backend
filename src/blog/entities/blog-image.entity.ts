import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Blog } from "./blog.entity";

@Entity({ name: 'blog_image' })
export class BlogImage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    path: string;

    @Column()
    blogId: number;

    @ManyToOne(() => Blog, (blog) => blog.blogImages)
    @JoinColumn({ name: 'blogId' })
    blogs: Blog;
}