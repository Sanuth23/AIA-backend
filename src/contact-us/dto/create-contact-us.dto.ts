import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator';

export class CreateContactUsDto {
    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    phoneNumber: string;

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
}
