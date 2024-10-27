import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductImageDto {
    @IsString()
    path: string;

    @IsNumber()
    @IsOptional()
    productId: number;
}
