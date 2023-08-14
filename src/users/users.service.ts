import { Injectable } from '@nestjs/common';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './model/user.model';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument> ,
  ) {}

  async createUser(dto: UserRegisterDto) {

    
    return dto;    
  }

  async login(dto: UserLoginDto) {
    return dto;
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

}
