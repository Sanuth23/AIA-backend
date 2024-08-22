import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateEventRegistrationDto } from './dto/create-event-registration.dto';
import { UpdateEventRegistrationDto } from './dto/update-event-registration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EventRegistration } from './entities/event-registration.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventRegistrationService {
  constructor(
    @InjectRepository(EventRegistration) private readonly eventRegRepository: Repository<EventRegistration>
  ) { }

  async create(createEventRegistrationDto: CreateEventRegistrationDto) {

    if (createEventRegistrationDto.upcomingEventId != null) {
      throw new BadRequestException('When creating a event registration, event id is a required field.');
    }

    try {
      createEventRegistrationDto.createdAt = new Date();
      const eventReg = this.eventRegRepository.create(createEventRegistrationDto);
      const eventRegEntity = await this.eventRegRepository.save(eventReg);;
      return eventRegEntity != null ? eventRegEntity : "Can't save the event registration. Please check the details & try again.";
    } catch (error) {
      throw new InternalServerErrorException('Failed to create event registration', error.message);
    }
  }

  async findAll() {
    try {
      const allEventRegs: EventRegistration[] = await this.eventRegRepository.find({
        relations: ['upcomingEvent'],
      });

      if (allEventRegs) {
        let finalizeEventRegs: EventRegistration[] = allEventRegs.filter((element) => {
          if (element.deletedBy == null) {
            return (element)
          }
        });

        finalizeEventRegs.sort((a1, a2) =>
          a2.createdAt.getTime() - a1.createdAt.getTime()
        );

        return finalizeEventRegs.length == 0 ? 'No Event Registration found.' : finalizeEventRegs;
      }
      return 'No Event Registration found.';
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve event registration', error.message);
    }
  }

  async findByEventId(eventId: number) {
    try {
      const allEventRegs: EventRegistration[] = await this.eventRegRepository.find({
        where: { upcomingEventId: eventId },
        relations: [],
      });

      if (allEventRegs) {
        let finalizeEventRegs: EventRegistration[] = allEventRegs.filter((element) => {
          if (element.deletedBy == null) {
            return (element)
          }
        });

        finalizeEventRegs.sort((a1, a2) =>
          a2.createdAt.getTime() - a1.createdAt.getTime()
        );

        return finalizeEventRegs.length == 0 ? 'No Event Registration found.' : finalizeEventRegs;
      }
      return 'No Event Registration found.';
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve event registration', error.message);
    }
  }

  async findOne(id: number) {
    return `This action returns a #${id} activity`;
  }

  update(id: number, updateEventRegistrationDto: UpdateEventRegistrationDto) {
    return `This action updates a #${id} eventRegistration`;
  }

  remove(id: number, deletedBy: number) {
    return `This action removes a #${id} eventRegistration`;
  }
}
