import { IsEmail, IsString, IsBoolean } from 'class-validator';

export class SetAdminDto {

  @IsString()
  @IsEmail()
  email: string;

  @IsBoolean()
  isadmin: boolean;

}