import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateContactUsDto } from './dto/create-contact-us.dto';
import { UpdateContactUsDto } from './dto/update-contact-us.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactUs } from './entities/contact-us.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactUsService {
  constructor(@InjectRepository(ContactUs) private readonly contactRepository: Repository<ContactUs>)
  {}

  async create(createContactUsDto: CreateContactUsDto) {
    if (createContactUsDto.email == null && createContactUsDto.phoneNumber == null) {
      throw new BadRequestException('When creating a contact us form, email & phone number are required fields.');
    }

    try {
      createContactUsDto.createdAt = new Date();
      const contact = this.contactRepository.create(createContactUsDto);
      const contactEntity = await this.contactRepository.save(contact);
      return contactEntity ? contactEntity : "Can't save the contactUs. Please check the details & try again.";
    } catch (error) {
      throw new InternalServerErrorException('Failed to create contactUs', error.message);
    }
  }

  async findAll() {
    try {
      const allContactUsForms: ContactUs[] = await this.contactRepository.find({
      });

      if (allContactUsForms) {
        let finalizeContactUsForms: ContactUs[] = allContactUsForms.filter((element) => {
          if (element && element.deletedBy == null) {
            return (element)
          }
        });

        finalizeContactUsForms.sort((a1, a2) =>
          a2.createdAt.getTime() - a1.createdAt.getTime()
        );

        return finalizeContactUsForms.length ? finalizeContactUsForms : 'No Contact Us Form found.';
      }
      return 'No Contact Us Form found.';
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve contact us form', error.message);
    }
  }

  async findOne(id: number) {
    try {
      const contactUsForm = await this.contactRepository.findOne({
        where: { id },
      });

      if (contactUsForm == null || contactUsForm.deletedBy != null) {
        throw new NotFoundException('Contact Us form not found for the given ID.');
      }
      
      return contactUsForm;
    } catch (error) {
      throw new InternalServerErrorException('Failed to find contact us form.', error.message);
    }
  }

  async update(id: number, updateContactUsDto: UpdateContactUsDto) {
    try {
      const contactUsForm: ContactUs = await this.contactRepository.findOne({
        where: { id },
      });

      if (!contactUsForm || contactUsForm.deletedBy != null) {
        throw new NotFoundException('Contact Us form not found for the given ID to update.');
      }

      updateContactUsDto.updatedAt = new Date();
      Object.assign(contactUsForm, updateContactUsDto);
      await this.contactRepository.save(contactUsForm);
      return 'Contact Us Form updated successfully.';

    } catch (error) {
      throw new InternalServerErrorException('Failed to update contact us form.', error.message);
    }
  }

  async remove(id: number, deletedBy: number) {
    try {
      const contactUsForm: ContactUs = await this.contactRepository.findOne({
        where: { id },
      });

      if (!contactUsForm || contactUsForm.deletedBy != null) {
        throw new NotFoundException('Contact Us form not found for the given ID to delete.');
      }

      contactUsForm.deletedBy = deletedBy;
      contactUsForm.deletedAt = new Date();
      await this.contactRepository.save(contactUsForm);
      return 'Contact Us Form deleted successfully.';

    } catch (error) {
      throw new InternalServerErrorException('Failed to update contact us form.', error.message);
    }
  }
}
