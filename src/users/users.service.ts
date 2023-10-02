import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRegisterDto } from './dto/user-register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './model/user.model';
import { compare, genSalt, hash } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import {
  INCORRECT_PASSWORD_ERROR,
  NOT_FOUND_USER_ERROR,
} from './constants.users';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
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

  async login(email: string): Promise<{ token: string }> {
    const payload = { email };
    const token = await this.jwtService.signAsync(payload);

    return { token };
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async getUserInfo(email: string) {
    const userInfoFound = await this.userModel.findOne({ email }).exec();

    if (!userInfoFound) {
      throw new NotFoundException(NOT_FOUND_USER_ERROR);
    }

    return {
      name: userInfoFound.name,
      email: userInfoFound.email,
      isAdmin: userInfoFound.isAdmin,
    };
  }

  async isAdmin(reqUserEmail: string): Promise<boolean> {
    return (await this.getUserInfo(reqUserEmail)).isAdmin;
  }
}
