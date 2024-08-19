import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator';

export class CreateActivityDto {
    @IsString()
    topic: string;

    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    imagePath: string;

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
}
