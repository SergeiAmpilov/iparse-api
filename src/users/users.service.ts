import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './model/user.model';
import { compare, genSalt, hash } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { INCORRECT_PASSWORD_ERROR, NOT_FOUND_USER_ERROR } from './constants.users';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
    private readonly configService: ConfigService,
  ) {}

  async createUser(dto: UserRegisterDto) {

    const saltHash = this.configService.get('SALT_HASH') ?? 10; 
    const salt = await genSalt(Number(saltHash));

    const passwordHash = await hash(dto.password, salt);
    const newUser = await this.userModel.create({
      name: dto.name,
      email: dto.email,
      passwordHash,
    });

    return newUser.save();

  }

  async validateUser(email: string, password: string) {
    const existedUser = await this.findByEmail(email);

    if (!existedUser) {
      throw new UnauthorizedException(NOT_FOUND_USER_ERROR);
    }

    const isCorrectPassword = await compare(password, existedUser.passwordHash);

    if (!isCorrectPassword) {
      throw new UnauthorizedException(INCORRECT_PASSWORD_ERROR);
    }

    return { email: existedUser.email };
  }

  async login(email: string) {
    return email;
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

}
