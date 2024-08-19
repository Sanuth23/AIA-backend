import { IsString, IsDate, IsNumber, IsOptional } from 'class-validator';
import { EventRegistration } from '../../event-registration/entities/event-registration.entity';

export class CreateUpcomingEventDto {
    @IsString()
    topic: string;

    @IsDate()
    date: Date;

    @IsString()
    location: string;

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
    eventRegistrations: EventRegistration[];
}
