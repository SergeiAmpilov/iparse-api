import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { SeoParserDocument } from './model/seoparser.model';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSeoParserDto } from './dto/create-seoparser.dto';
import { UsersService } from 'src/users/users.service';
import { UserDocument } from 'src/users/model/user.model';
import { NOT_FOUND_USER_ERROR } from 'src/users/constants.users';
import { SEO_PARSER_NOT_FOUND_ERROR } from './seoparser.constants';

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

  async getByOwner(ownerEmail: string) {
    const userFound: UserDocument = await this.usersService.findByEmail(
      ownerEmail,
    );

    if (!userFound) {
      throw new NotFoundException(NOT_FOUND_USER_ERROR);
    }

    return this.seoParserModel.find({ owner: userFound.id }).exec();
  }

  async findById(id: string, ownerEmail: string) {
    const userFound: UserDocument = await this.usersService.findByEmail(
      ownerEmail,
    );

    if (!userFound) {
      throw new NotFoundException(NOT_FOUND_USER_ERROR);
    }

    const seoParserFound = await this.seoParserModel
      .find({
        _id: id,
        owner: userFound.id,
      })
      .exec();

    if (!seoParserFound) {
      throw new NotFoundException(SEO_PARSER_NOT_FOUND_ERROR);
    }

    return seoParserFound;
  }
}
