import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator';
import { MemberReference } from '../../member-reference/entities/member-reference.entity';

export class CreateTeamMemberDto {
    @IsString()
    name: string;

    @IsString()
    imagePath: string;

    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    link1: string;

    @IsString()
    @IsOptional()
    link2: string;

    @IsString()
    @IsOptional()
    link3: string;

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
    memberReferences: MemberReference[];
}
