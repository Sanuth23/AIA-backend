import { Module } from '@nestjs/common';
import { EventRegistrationService } from './event-registration.service';
import { EventRegistrationController } from './event-registration.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventRegistration } from './entities/event-registration.entity';
import { UpcomingEvent } from '../upcoming-event/entities/upcoming-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventRegistration,UpcomingEvent])],
  controllers: [EventRegistrationController],
  providers: [EventRegistrationService],
})
export class EventRegistrationModule {}
