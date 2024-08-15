import { Injectable } from '@nestjs/common';
import { CreateUpcomingEventDto } from './dto/create-upcoming-event.dto';
import { UpdateUpcomingEventDto } from './dto/update-upcoming-event.dto';

@Injectable()
export class UpcomingEventService {
  create(createUpcomingEventDto: CreateUpcomingEventDto) {
    return 'This action adds a new upcomingEvent';
  }

  findAll() {
    return `This action returns all upcomingEvent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upcomingEvent`;
  }

  update(id: number, updateUpcomingEventDto: UpdateUpcomingEventDto) {
    return `This action updates a #${id} upcomingEvent`;
  }

  remove(id: number) {
    return `This action removes a #${id} upcomingEvent`;
  }
}
