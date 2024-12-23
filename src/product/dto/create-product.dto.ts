import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator';
import { ProductImage } from '../entities/product-image.entity';
import { CreateProductImageDto } from './create-product-image.dto';

export class CreateProductDto {
    @IsString()
    mainTitle: string;

    @IsString()
    topic: string;

    @IsNumber()
    @IsOptional()
    coverAge: string;

    @IsNumber()
    @IsOptional()
    issueAge: string;

    @IsString()
    description: string;

    @IsNumber()
    categoryId: number;

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
    productImages: CreateProductImageDto[];
}
