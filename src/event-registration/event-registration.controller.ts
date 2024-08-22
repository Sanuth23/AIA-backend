import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EventRegistrationService } from './event-registration.service';
import { CreateEventRegistrationDto } from './dto/create-event-registration.dto';
import { UpdateEventRegistrationDto } from './dto/update-event-registration.dto';

@Controller('event-registration')
export class EventRegistrationController {
  constructor(private readonly eventRegistrationService: EventRegistrationService) {}

  @Post()
  create(@Body() createEventRegistrationDto: CreateEventRegistrationDto) {
    return this.eventRegistrationService.create(createEventRegistrationDto);
  }

  @Get()
  findAll() {
    return this.eventRegistrationService.findAll();
  }

  @Get('event/:eventId')
  findByEventId(@Param('eventId') eventId: string) {
    return this.eventRegistrationService.findByEventId(+eventId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventRegistrationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventRegistrationDto: UpdateEventRegistrationDto) {
    return this.eventRegistrationService.update(+id, updateEventRegistrationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Query('deletedBy') deletedBy: string)  {
    return this.eventRegistrationService.remove(+id, +deletedBy);
  }
}
