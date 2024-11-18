import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateLoginDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}