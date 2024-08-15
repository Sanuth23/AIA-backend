import { Module } from '@nestjs/common';
import { MemberReferenceService } from './member-reference.service';
import { MemberReferenceController } from './member-reference.controller';

@Module({
  controllers: [MemberReferenceController],
  providers: [MemberReferenceService],
})
export class MemberReferenceModule {}
