import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { SeoParserDocument } from './model/seoparser.model';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSeoParserDto } from './dto/create-seoparser.dto';
import { UsersService } from 'src/users/users.service';
import { UserDocument } from 'src/users/model/user.model';
import { NOT_FOUND_USER_ERROR } from 'src/users/constants.users';

@Injectable()
export class SeoparserService {
  constructor(
    @InjectModel('seoparser')
    private readonly seoParserModel: Model<SeoParserDocument>,
    private readonly usersService: UsersService,
  ) {}

  async create(
    dto: CreateSeoParserDto,
    ownerEmail: string,
    isActive: boolean,
  ): Promise<SeoParserDocument> {
    const userFound: UserDocument = await this.usersService.findByEmail(
      ownerEmail,
    );

    if (!userFound) {
      throw new NotFoundException(NOT_FOUND_USER_ERROR);
    }

    return this.seoParserModel.create({
      ...dto,
      owner: userFound.id,
      isActive,
    });
  }

  // async getAll() {
  //   return this.seoParserModel.find().exec();
  // }

  async getByOwner(ownerEmail: string) {
    const userFound: UserDocument = await this.usersService.findByEmail(
      ownerEmail,
    );

    if (!userFound) {
      throw new NotFoundException(NOT_FOUND_USER_ERROR);
    }

    return this.seoParserModel.find({ owner: userFound.id }).exec();
  }
}
