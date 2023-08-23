import { Injectable, NotFoundException } from '@nestjs/common';
import { SeoparserService } from 'src/seoparser/seoparser.service';
import { CreateSeoTaskDto } from './dto/create-seotask.dto';
import { SEO_PARSER_NOT_FOUND_ERROR } from 'src/seoparser/seoparser.constants';
import { InjectModel } from '@nestjs/mongoose';
import { SeoTaskDocument } from './model/seotask.model';
import { Model } from 'mongoose';

@Injectable()
export class SeotaskService {
  constructor(
    @InjectModel('seotask')
    private readonly seoTaskModel: Model<SeoTaskDocument>,
    private readonly seoParserService: SeoparserService,
  ) {}


  async createAndRunNewTask(dto: CreateSeoTaskDto, ownerEmail: string) {
    const seoParser = await this.seoParserService.getVerifiedParser(dto.parser, ownerEmail);

    if (!seoParser) {
      throw new NotFoundException(SEO_PARSER_NOT_FOUND_ERROR)
    }

    const newTask = await this.seoTaskModel.create({
      ...dto,      
    });

    // тут нужно сделать запрос на создание нового таска в самом парсере

    return newTask._id;

  }
}
