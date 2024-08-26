import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMemberReferenceDto } from './dto/create-member-reference.dto';
import { UpdateMemberReferenceDto } from './dto/update-member-reference.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberReference } from './entities/member-reference.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MemberReferenceService {
  constructor(
    @InjectRepository(MemberReference) private readonly referenceRepository: Repository<MemberReference>
  ) { }
  
  async create(createMemberReferenceDto: CreateMemberReferenceDto) {
    if (createMemberReferenceDto.teamMemberId == null && createMemberReferenceDto.productCategoryId == null) {
      throw new BadRequestException('When creating a member reference, member id & category id is a required field.');
    }

    try {
      createMemberReferenceDto.createdAt = new Date();
      const reference = this.referenceRepository.create(createMemberReferenceDto);
      const referenceEntity = await this.referenceRepository.save(reference);;
      return referenceEntity != null ? referenceEntity : "Can't save the reference. Please check the details & try again.";
    } catch (error) {
      throw new InternalServerErrorException('Failed to create member reference', error.message);
    }
  }

  async findAll() {
    try {
      const allReferences: MemberReference[] = await this.referenceRepository.find({
        relations: [],
      });

      if (allReferences) {
        let finalizeReferences: MemberReference[] = allReferences.filter((element) => {
          if (element.deletedBy == null && element.teamMemberId != null && element.productCategoryId != null) {
            return (element)
          }
        });

        finalizeReferences.sort((a1, a2) =>
          a2.createdAt.getTime() - a1.createdAt.getTime()
        );

        return finalizeReferences.length == 0 ? 'No Member Reference found.' : finalizeReferences;
      }
      return 'No Member Reference found.';
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve member reference', error.message);
    }
  }

  async findByMemberId(memberId: number) {
    try {
      const allReferences: MemberReference[] = await this.referenceRepository.find({
        where: { teamMemberId: memberId },
        relations: [],
      });

      if (allReferences) {
        let finalizeReferences: MemberReference[] = allReferences.filter((element) => {
          if (element.deletedBy == null && element.productCategoryId != null) {
            return (element)
          }
        });

        finalizeReferences.sort((a1, a2) =>
          a2.createdAt.getTime() - a1.createdAt.getTime()
        );

        return finalizeReferences.length == 0 ? 'No Member Reference found.' : finalizeReferences;
      }
      return 'No Member Reference found.';
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve member reference', error.message);
    }
  }

  async findByCategoryId(categoryId: number) {
    try {
      const allReferences: MemberReference[] = await this.referenceRepository.find({
        where: { productCategoryId: categoryId },
        relations: [],
      });

      if (allReferences) {
        let finalizeReferences: MemberReference[] = allReferences.filter((element) => {
          if (element.deletedBy == null && element.teamMemberId != null) {
            return (element)
          }
        });

        finalizeReferences.sort((a1, a2) =>
          a2.createdAt.getTime() - a1.createdAt.getTime()
        );

        return finalizeReferences.length == 0 ? 'No Member Reference found.' : finalizeReferences;
      }
      return 'No Member Reference found.';
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve member reference', error.message);
    }
  }

  async findOne(id: number) {
    return `This action returns a #${id} memberReference`;
  }

  async update(id: number, updateMemberReferenceDto: UpdateMemberReferenceDto) {
    return `This action updates a #${id} memberReference`;
  }

  async remove(id: number) {
    return `This action removes a #${id} memberReference`;
  }
}
