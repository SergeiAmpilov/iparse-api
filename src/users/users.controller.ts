import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserRegisterDto } from './dto/user-register.dto';
import { UsersService } from './users.service';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService, 
  ) {  }

  @Post('register')
  async register(
    @Body() dto: UserRegisterDto,
  ) {

    return this.usersService.register(dto);

  }

  @HttpCode(200)
  @Post('login')
  async login(dto: UserLoginDto) {
    return this.usersService.login(dto);
  }
}
