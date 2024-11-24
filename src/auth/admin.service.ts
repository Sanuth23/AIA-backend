import { forwardRef, Inject, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepository: Repository<Admin>,
  ) { }

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const { username, password, isSuperAdmin } = createAdminDto;
    const isExist = await this.adminRepository.findOne({ where: { username } });
    if (isExist) {
      throw new NotAcceptableException("Username already exist");
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = this.adminRepository.create({
      username,
      password: hashedPassword,
      isSuperAdmin,
    });
    return this.adminRepository.save(admin);
  }

  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto): Promise<Admin> {
    const admin = await this.adminRepository.findOneBy({ id: id });
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    admin.password = await bcrypt.hash(updatePasswordDto.password, 10);
    return this.adminRepository.save(admin);
  }

  async findByUsername(username: string): Promise<Admin | undefined> {
    return this.adminRepository.findOne({ where: { username } });
  }

  async findById(id: number): Promise<Admin | undefined> {
    return this.adminRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Admin[] | undefined> {
    return this.adminRepository.find();
  }

  async remove(id: number) {
    return this.adminRepository.delete(id);
  }
}
