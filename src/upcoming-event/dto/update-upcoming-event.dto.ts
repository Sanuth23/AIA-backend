import { PartialType } from '@nestjs/mapped-types';
import { CreateUpcomingEventDto } from './create-upcoming-event.dto';

export class UpdateUpcomingEventDto extends PartialType(CreateUpcomingEventDto) {}
