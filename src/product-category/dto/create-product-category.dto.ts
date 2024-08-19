import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator';
import { MemberReference } from '../../member-reference/entities/member-reference.entity';
import { Product } from '../../product/entities/product.entity';

export class CreateProductCategoryDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

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
    products: Product[];

    @IsOptional()
    memberReferences: MemberReference[];
}
