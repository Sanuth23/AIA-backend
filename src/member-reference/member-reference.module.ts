import { Module } from '@nestjs/common';
import { MemberReferenceService } from './member-reference.service';
import { MemberReferenceController } from './member-reference.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberReference } from './entities/member-reference.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MemberReference])],
  controllers: [MemberReferenceController],
  providers: [MemberReferenceService],
})
export class MemberReferenceModule {}
