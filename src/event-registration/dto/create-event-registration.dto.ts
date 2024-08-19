import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator';

export class CreateEventRegistrationDto {
    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    phoneNumber: string;

    @IsNumber()
    age: number;

    @IsString()
    address: string;

    @IsString()
    gender: string;

    @IsNumber()
    upcomingEventId: number;

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
