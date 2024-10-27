import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity) private readonly activityRepository: Repository<Activity>
  ) { }

  async create(createActivityDto: CreateActivityDto) {
    if (createActivityDto.createdBy == null) {
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
      });

      if (allActivities) {
        let finalizeActivities: Activity[] = allActivities.filter((element) => {
          if (element.deletedBy == null) {
            return (element)
          }
        });

        finalizeActivities.sort((a1, a2) =>
          a2.createdAt.getTime() - a1.createdAt.getTime()
        );

        return finalizeActivities.length == 0 ? 'No Activities found.' : finalizeActivities;
      }
      return 'No Activities found.';
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve activities', error.message);
    }
  }

  async findOne(id: number) {
    try {
      const activity = await this.activityRepository.findOne({
        where: { id },
      });

      if (activity == null || activity.deletedBy != null) {
        throw new NotFoundException('Activity not found for the given ID.');
      }
      
      return activity;
    } catch (error) {
      throw new InternalServerErrorException('Failed to find activity.', error.message);
    }
  }

  async update(id: number, updateActivityDto: UpdateActivityDto) {
    try {
      const activity = await this.activityRepository.findOne({
        where: { id },
        relations: []
      });

      if (activity == null || activity.deletedBy != null) {
        throw new NotFoundException('No Matching Activity to update.');
      }

      updateActivityDto.updatedAt = new Date();
      Object.assign(activity, updateActivityDto);
      await this.activityRepository.save(activity);
      return "Activity updated successfully.";
    } catch (error) {
      throw new InternalServerErrorException('Failed to update activity', error.message);
    }
  }

  async remove(id: number, deletedBy: number) {
    try {
      const activity = await this.activityRepository.findOne({
        where: { id }
      });

      if (activity == null || activity.deletedAt != null) {
        throw new NotFoundException('There is no Activity to delete.');
      }

      activity.deletedBy = deletedBy;
      activity.deletedAt = new Date();
      await this.activityRepository.save(activity);
      return 'Activity is deleted successfully.';
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete activity', error.message);
    }
  }
}
