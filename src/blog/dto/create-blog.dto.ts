import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator';
import { BlogImage } from '../entities/blog-image.entity';

export class CreateBlogDto {
    @IsString()
    topic: string;

    @IsString()
    description: string;

    @IsNumber()
    adminId: number;

    @IsNumber()
    @IsOptional()
    createdBy: number;

    @IsOptional()
    @IsNumber()
    updatedBy: number;

    @IsOptional()
    @IsNumber()
    deletedBy: number;

    @IsOptional()
    @IsDate()
    createdAt: Date;

    @IsOptional()
    @IsDate()
    updatedAt: Date;

    @IsOptional()
    @IsDate()
    deletedAt: Date;

    @IsOptional()
    blogImages: BlogImage[];
}
