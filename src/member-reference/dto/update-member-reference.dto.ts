import { PartialType } from '@nestjs/mapped-types';
import { CreateMemberReferenceDto } from './create-member-reference.dto';

export class UpdateMemberReferenceDto extends PartialType(CreateMemberReferenceDto) {}
