import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserRegisterDto } from './dto/user-register.dto';
import { UsersService } from './users.service';
import { UserLoginDto } from './dto/user-login.dto';
import { NOT_FOUND_USER_ERROR, PERMISSION_DENIED_ERROR, USER_ALREADY_EXIST_ERROR } from './constants.users';
import { JwtAuthGuard } from './guards/jwt.guard';
import { UserEmail } from 'src/decorators/user-email.decorator';
import { SetAdminDto } from './dto/set-admin.dto';

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

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('setadmin')
  async setAdmin(@Body() { email, isadmin }: SetAdminDto, @UserEmail() authUserEmail: string ) {
    
    const isAdmin = await this.usersService.isAdmin(authUserEmail);

    if (!isAdmin) {
      throw new ForbiddenException(PERMISSION_DENIED_ERROR);
    }

    const userFound = await this.usersService.findByEmail(email);

    if (!userFound) {
      throw new NotFoundException(NOT_FOUND_USER_ERROR);
    }

    this.usersService.setAdmin(userFound._id, isadmin);

    return { ok: 'updated' };
  }
}
