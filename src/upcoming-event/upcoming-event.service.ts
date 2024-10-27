import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUpcomingEventDto } from './dto/create-upcoming-event.dto';
import { UpdateUpcomingEventDto } from './dto/update-upcoming-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpcomingEvent } from './entities/upcoming-event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UpcomingEventService {
  constructor(
    @InjectRepository(UpcomingEvent) private readonly eventRepository: Repository<UpcomingEvent>
  ) { }

  async create(createUpcomingEventDto: CreateUpcomingEventDto) {
    if (createUpcomingEventDto.createdBy == null || createUpcomingEventDto.date == null) {
      throw new BadRequestException('When creating a event, user id & date is a required field.');
    }

    try {
      createUpcomingEventDto.createdAt = new Date();
      const event = this.eventRepository.create(createUpcomingEventDto);
      const eventEntity = await this.eventRepository.save(event);
      return eventEntity ? eventEntity : "Can't save the upcoming event. Please check the details & try again.";
    } catch (error) {
      throw new InternalServerErrorException('Failed to create event', error.message);
    }
  }

  async findAll() {
    try {
      const allEvents: UpcomingEvent[] = await this.eventRepository.find({
        relations: []
      });

      if (allEvents) {
        let finalizeEvents: UpcomingEvent[] = allEvents.filter((element) => {
          if (element && element.deletedBy == null &&
            element.date.getTime() > new Date().getTime()) {
            return (element)
          }
        });

        finalizeEvents.sort((a1, a2) =>
          a2.createdAt.getTime() - a1.createdAt.getTime()
        );

        return finalizeEvents.length ? finalizeEvents : 'No Upcoming Event found.';
      }
      return 'No Upcoming Event found.';
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve event', error.message);
    }
  }

  async findOne(id: number) {
    try {
      const event = await this.eventRepository.findOne({
        where: { id },
      });

      if (event == null || event.deletedBy != null) {
        throw new NotFoundException('Upcoming Event not found for the given ID.');
      }
      
      return event;
    } catch (error) {
      throw new InternalServerErrorException('Failed to find upcoming event.', error.message);
    }
  }

  async update(id: number, updateUpcomingEventDto: UpdateUpcomingEventDto) {
    try {
      const upcomingEvent: UpcomingEvent = await this.eventRepository.findOne({
        where: { id },
      });

      if (!upcomingEvent || upcomingEvent.deletedBy != null || upcomingEvent.date == null) {
        throw new NotFoundException('No Matching Upcoming Event to update.');
      }

      updateUpcomingEventDto.updatedAt = new Date();
      Object.assign(upcomingEvent, updateUpcomingEventDto);
      await this.eventRepository.save(upcomingEvent);
      return 'Upcoming Event updated successfully.';

    } catch (error) {
      throw new InternalServerErrorException('Failed to update upcoming event.', error.message);
    }
  }

  async remove(id: number, deletedBy: number) {
    try {
      const upcomingEvent: UpcomingEvent = await this.eventRepository.findOne({
        where: { id },
      });

      if (!upcomingEvent || upcomingEvent.deletedBy != null) {
        throw new NotFoundException('No Matching Upcoming Event to delete.');
      }

      upcomingEvent.deletedBy = deletedBy;
      upcomingEvent.deletedAt = new Date();
      await this.eventRepository.save(upcomingEvent);
      return 'Upcoming Event is deleted successfully.'

    } catch (error) {
      throw new InternalServerErrorException('Failed to delete upcoming event.', error.message);
    }
  }
}
