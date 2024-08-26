import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MemberReferenceService } from './member-reference.service';
import { CreateMemberReferenceDto } from './dto/create-member-reference.dto';
import { UpdateMemberReferenceDto } from './dto/update-member-reference.dto';

@Controller('member-reference')
export class MemberReferenceController {
  constructor(private readonly memberReferenceService: MemberReferenceService) {}

  @Post()
  create(@Body() createMemberReferenceDto: CreateMemberReferenceDto) {
    return this.memberReferenceService.create(createMemberReferenceDto);
  }

  @Get()
  findAll() {
    return this.memberReferenceService.findAll();
  }

  @Get('member/:memberId')
  findByMemberId(@Param('memberId') memberId: string) {
    return this.memberReferenceService.findByMemberId(+memberId);
  }

  @Get('category/:categoryId')
  findByCategoryId(@Param('categoryId') categoryId: string) {
    return this.memberReferenceService.findByCategoryId(+categoryId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberReferenceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberReferenceDto: UpdateMemberReferenceDto) {
    return this.memberReferenceService.update(+id, updateMemberReferenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Query('deletedBy') deletedBy: string)  {
    return this.memberReferenceService.remove(+id, +deletedBy);
  }
}
