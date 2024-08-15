import { Module } from '@nestjs/common';
import { UpcomingEventService } from './upcoming-event.service';
import { UpcomingEventController } from './upcoming-event.controller';

@Module({
  controllers: [UpcomingEventController],
  providers: [UpcomingEventService],
})
export class UpcomingEventModule {}
