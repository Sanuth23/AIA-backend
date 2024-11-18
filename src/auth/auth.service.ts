import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../auth/admin.service';
import * as bcrypt from 'bcryptjs';
import { CreateLoginDto } from './dto/create-login.dto';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async validateAdmin(createLoginDto: CreateLoginDto): Promise<Admin> {
    const admin = await this.adminService.findByUsername(createLoginDto.username);
    if (admin && await bcrypt.compare(createLoginDto.password, admin.password)) {
      return admin;
    }
    return null;
  }

  async login(admin: any) {
    const payload = { username: admin.username, sub: admin.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
