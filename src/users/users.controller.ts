import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserRegisterDto } from './dto/user-register.dto';
import { UsersService } from './users.service';
import { UserLoginDto } from './dto/user-login.dto';
import { PERMISSION_DENIED_ERROR, USER_ALREADY_EXIST_ERROR } from './constants.users';
import { JwtAuthGuard } from './guards/jwt.guard';
import { UserEmail } from 'src/decorators/user-email.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: UserRegisterDto) {
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
  async login(@Body() { login, password }: UserLoginDto) {
    const { email } = await this.usersService.validateUser(login, password);
    return this.usersService.login(email);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('info/:email')
  async getInfo(@Param('email') email: string, @UserEmail() authUserEmail: string) {
    const isAdmin = await this.usersService.isAdmin(authUserEmail);

    if (!isAdmin) {
      throw new ForbiddenException(PERMISSION_DENIED_ERROR);
    }

    return this.usersService.getUserInfo(email);
  }
}
