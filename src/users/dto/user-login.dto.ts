import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @IsEmail()
  login: string;

  @IsString()
  password: string;
}
