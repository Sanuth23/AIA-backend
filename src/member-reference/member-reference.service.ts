import { Injectable } from '@nestjs/common';
import { CreateMemberReferenceDto } from './dto/create-member-reference.dto';
import { UpdateMemberReferenceDto } from './dto/update-member-reference.dto';

@Injectable()
export class MemberReferenceService {
  create(createMemberReferenceDto: CreateMemberReferenceDto) {
    return 'This action adds a new memberReference';
  }

  findAll() {
    return `This action returns all memberReference`;
  }

  findOne(id: number) {
    return `This action returns a #${id} memberReference`;
  }

  update(id: number, updateMemberReferenceDto: UpdateMemberReferenceDto) {
    return `This action updates a #${id} memberReference`;
  }

  remove(id: number) {
    return `This action removes a #${id} memberReference`;
  }
}
