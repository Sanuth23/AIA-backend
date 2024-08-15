import { Test, TestingModule } from '@nestjs/testing';
import { MemberReferenceController } from './member-reference.controller';
import { MemberReferenceService } from './member-reference.service';

describe('MemberReferenceController', () => {
  let controller: MemberReferenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberReferenceController],
      providers: [MemberReferenceService],
    }).compile();

    controller = module.get<MemberReferenceController>(MemberReferenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
