import { Test, TestingModule } from '@nestjs/testing';
import { MemberReferenceService } from './member-reference.service';

describe('MemberReferenceService', () => {
  let service: MemberReferenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemberReferenceService],
    }).compile();

    service = module.get<MemberReferenceService>(MemberReferenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
