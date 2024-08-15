import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UpcomingEventService } from './upcoming-event.service';
import { CreateUpcomingEventDto } from './dto/create-upcoming-event.dto';
import { UpdateUpcomingEventDto } from './dto/update-upcoming-event.dto';

@Controller('upcoming-event')
export class UpcomingEventController {
  constructor(private readonly upcomingEventService: UpcomingEventService) {}

  @Post()
  create(@Body() createUpcomingEventDto: CreateUpcomingEventDto) {
    return this.upcomingEventService.create(createUpcomingEventDto);
  }

  @Get()
  findAll() {
    return this.upcomingEventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.upcomingEventService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUpcomingEventDto: UpdateUpcomingEventDto) {
    return this.upcomingEventService.update(+id, updateUpcomingEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.upcomingEventService.remove(+id);
  }
}
