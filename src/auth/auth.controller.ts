import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { JwtAuthGuard } from './jwt.guard';
import { CreateLoginDto } from './dto/create-login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly adminService: AdminService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async signUp(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Put(':id/password')
  async updatePassword(@Param('id') id: number, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.adminService.updatePassword(id, updatePasswordDto);
  }

  // @Post('login')
  // async login(@Body() createLoginDto: CreateLoginDto) {
  //   const admin = await this.authService.validateAdmin(createLoginDto);
  //   return this.authService.login(admin);
  // }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  // @UseGuards(JwtAuthGuard)
  @Get('find-by-id/:id')
  findById(@Param('id') id: string) {
    return this.adminService.findById(+id);
  }

  @Get('find-by-username/:username')
  findByUsername(@Param('username') username: string) {
    return this.adminService.findByUsername(username);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
