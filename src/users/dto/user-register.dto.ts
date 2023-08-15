import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserRegisterDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
