import { Injectable, NotFoundException } from '@nestjs/common';
import { SeoparserService } from 'src/seoparser/seoparser.service';
import { CreateSeoTaskDto } from './dto/create-seotask.dto';
import { SEO_PARSER_NOT_FOUND_ERROR } from 'src/seoparser/seoparser.constants';
import { InjectModel } from '@nestjs/mongoose';
import { SeoTaskDocument } from './model/seotask.model';
import { Model } from 'mongoose';
import { SEO_TASK_NOT_FOUND_ERROR } from './connstants.seotask';
import { FinishSeoTaskDto } from './dto/finish-seotask.dto';

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

    return newTask;

  }

  async getVerifiedTask(id: string, userEmail: string): Promise<SeoTaskDocument | undefined> {

    const taskFound = await this.seoTaskModel.findById(id).exec();

    if (!taskFound) {
      throw new NotFoundException(SEO_TASK_NOT_FOUND_ERROR);
    }

    const seoParser = await this.seoParserService.getVerifiedParser(taskFound.parser.toString(), userEmail);

    if (!seoParser) {
      throw new NotFoundException(SEO_TASK_NOT_FOUND_ERROR)
    }

   return taskFound;
 
  }

  async getTaskListByParser(parserid: string, userEmail: string) {
    const seoParser = await this.seoParserService.getVerifiedParser(parserid, userEmail);
    
    if (!seoParser) {
      throw new NotFoundException(SEO_PARSER_NOT_FOUND_ERROR)
    }

    return this.seoTaskModel.find({
      parser: parserid,
    }).exec();

  }


  async finishTask(dto: FinishSeoTaskDto, id: string, userEmail: string ) {


    // тут нужно проверить, что user - имеет права ПАРСЕРА. юзер это не владелец ресурса, это парсер

    return this.seoTaskModel.findByIdAndUpdate(id, {
      ...dto,
      finish: Date.now()
    }, {new: true}).exec();


  }

}
