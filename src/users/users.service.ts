import { Injectable } from '@nestjs/common';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class UsersService {


  async register(dto: UserRegisterDto) {

  }

  async login(dto: UserLoginDto) {

  }
  
}
