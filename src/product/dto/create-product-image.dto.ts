import { IsString, IsNumber } from 'class-validator';

export class CreateProductImageDto {
    @IsString()
    path: string;

    @IsNumber()
    productId: number;
}
