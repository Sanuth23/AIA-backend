import { Test, TestingModule } from '@nestjs/testing';
import { UpcomingEventService } from './upcoming-event.service';

describe('UpcomingEventService', () => {
  let service: UpcomingEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpcomingEventService],
    }).compile();

    service = module.get<UpcomingEventService>(UpcomingEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
