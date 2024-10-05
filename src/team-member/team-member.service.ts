import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamMember } from './entities/team-member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeamMemberService {
  constructor(
    @InjectRepository(TeamMember) private readonly teamMemberRepository: Repository<TeamMember>
  ) { }

  async create(createTeamMemberDto: CreateTeamMemberDto) {
    if (createTeamMemberDto.name == null) {
      throw new BadRequestException('When creating a team member, name is a required field.');
    }

    try {
      createTeamMemberDto.createdAt = new Date();
      const teamMember = this.teamMemberRepository.create(createTeamMemberDto);
      const teamMemberEntity = await this.teamMemberRepository.save(teamMember);;
      return teamMemberEntity != null ? teamMemberEntity : "Can't save the team member. Please check the details & try again.";
    } catch (error) {
      throw new InternalServerErrorException('Failed to create team member', error.message);
    }
  }

  async findAll() {
    try {
      const allTeamMembers: TeamMember[] = await this.teamMemberRepository.find({
        relations: ['memberReferences'],
      });

      if (allTeamMembers) {
        let finalizeTeamMembers: TeamMember[] = allTeamMembers.filter((element) => {
          if (element.deletedBy == null) {
            return (element)
          }
        });

        finalizeTeamMembers.sort((a1, a2) =>
          a2.createdAt.getTime() - a1.createdAt.getTime()
        );

        return finalizeTeamMembers.length == 0 ? 'No Team Member found.' : finalizeTeamMembers;
      }
      return 'No Team Member found.';
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve team member', error.message);
    }
  }

  async findOne(id: number) {
    try {
      const teamMember = await this.teamMemberRepository.findOne({
        where: { id },
        relations: []
      });

      if (teamMember == null || teamMember.deletedBy != null) {
        throw new NotFoundException('Team Member not found for the given ID');
      }
      return teamMember;
    } catch (error) {
      throw new InternalServerErrorException('Failed to find the team member for the given id.', error.message);
    }
  }

  async update(id: number, updateTeamMemberDto: UpdateTeamMemberDto) {
    try {
      const teamMember = await this.teamMemberRepository.findOne({
        where: { id },
        relations: []
      });

      if (teamMember == null || teamMember.deletedBy != null) {
        throw new NotFoundException('No Matching Team Member to update.');
      }

      updateTeamMemberDto.updatedAt = new Date();
      Object.assign(teamMember, updateTeamMemberDto);
      await this.teamMemberRepository.save(teamMember);
      return "Team Member updated successfully.";
    } catch (error) {
      throw new InternalServerErrorException('Failed to update team member', error.message);
    }
  }

  async remove(id: number, deletedBy: number) {
    try {
      const teamMember = await this.teamMemberRepository.findOne({
        where: { id }
      });

      if (teamMember == null || teamMember.deletedAt != null) {
        throw new NotFoundException('There is no Team Member to delete.');
      }

      teamMember.deletedBy = deletedBy;
      teamMember.deletedAt = new Date();
      await this.teamMemberRepository.save(teamMember);
      return 'Team Member is deleted successfully.';
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete team member', error.message);
    }
  }
}
