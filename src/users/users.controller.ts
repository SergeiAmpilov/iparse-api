import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserRegisterDto } from './dto/user-register.dto';
import { UsersService } from './users.service';
import { UserLoginDto } from './dto/user-login.dto';
import { USER_ALREADY_EXIST_ERROR } from './constants.users';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService, 
  ) {  }

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(
    @Body() dto: UserRegisterDto,
  ) {

    const existingUser = await this.usersService.findByEmail(dto.email);

    if (existingUser) {
      throw new BadRequestException(USER_ALREADY_EXIST_ERROR);
    }

    const newUser = await this.usersService.createUser(dto);

    return { ok: newUser.email };
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(
    @Body() { email, password }: UserLoginDto
    ) {

      const resValidate: { email: string} = await this.usersService.validateUser(email, password);
      return this.usersService.login(resValidate.email);
  }
}
