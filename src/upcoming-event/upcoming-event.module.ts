import { Module } from '@nestjs/common';
import { UpcomingEventService } from './upcoming-event.service';
import { UpcomingEventController } from './upcoming-event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpcomingEvent } from './entities/upcoming-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UpcomingEvent])],
  controllers: [UpcomingEventController],
  providers: [UpcomingEventService],
})
export class UpcomingEventModule {}
