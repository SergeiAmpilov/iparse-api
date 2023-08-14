import { Injectable } from '@nestjs/common';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './model/user.model';
import { genSalt, hash } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';

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

  async login(dto: UserLoginDto) {
    return dto;
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

}
