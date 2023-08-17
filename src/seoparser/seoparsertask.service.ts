import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SeoParserTaskDocument } from './model/seoparser.task.model';

@Injectable()
export class SeoparsertaskService {
  constructor(
    @InjectModel('seoparsertask')
    private readonly seoParserTaskModel: Model<SeoParserTaskDocument>,
  ) {}

  async runParsing(id: string, resource: string) {
    const start = new Date();
    const finish = new Date();
    const count = 101;
    const file = 'demo file';

    const parseResult = {
      parser: id,
      resource,
      start,
      finish,
      count,
      file,
    };

    this.seoParserTaskModel.create(parseResult);
  }

  async getTasksByParser(parser: string) {
    return this.seoParserTaskModel.find({ parser }).exec();
  }
}
