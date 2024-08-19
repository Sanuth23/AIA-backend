import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity) private readonly activityRepository: Repository<Activity>
  ){}

  async create(createActivityDto: CreateActivityDto) {
    if (createActivityDto.createdBy == null ) {
      throw new BadRequestException('When creating a activity, created by is a required field.');
    }

    try {
      createActivityDto.createdAt = new Date();
      const activity = this.activityRepository.create(createActivityDto);
      const activityEntity = await this.activityRepository.save(activity);;
      return activityEntity != null ? activityEntity : "Can't save the activity. Please check the details & try again.";
    } catch (error) {
      throw new InternalServerErrorException('Failed to create activity', error.message);
    }
  }

  async findAll() {
    try {
      const allActivities: Activity[] = await this.activityRepository.find({
        relations: [],
      })

      if (allActivities) {
        let finalizeActivities: Activity[] = allActivities.filter((element) => {
          if (element.deletedBy == null) {
            return (
              element
            )
          }
        })
        return finalizeActivities.length == 0 ? 'No Activities found.' : finalizeActivities;
      }
      return 'No Activities found.';
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve activities', error.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} activity`;
  }

  update(id: number, updateActivityDto: UpdateActivityDto) {
    return `This action updates a #${id} activity`;
  }

  remove(id: number) {
    return `This action removes a #${id} activity`;
  }
}
