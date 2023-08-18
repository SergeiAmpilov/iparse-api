import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SeoParserTaskDocument } from './model/seoparser.task.model';
import axios from 'axios';
import { ProxyConfig } from './proxy.config';
import { parseString, parseStringPromise } from 'xml2js';



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

  async getPagesList(sitemapUrl): Promise<string[]> {

    const linkList: string[] = [];
    const smList: string[] = [];
    
    const { data } = await axios.get(sitemapUrl, { proxy: ProxyConfig });
    const parseResult = await parseStringPromise(data);

    if (parseResult && parseResult?.sitemapindex?.sitemap?.length) {
      for (const { loc } of parseResult.sitemapindex.sitemap) {
        smList.push(loc[0]);
      }      
    }


    for (const sm of smList) {
      
      const { data } = await axios.get(sm, { proxy: ProxyConfig });
      const parseResultSm = await parseStringPromise(data);

      if (parseResultSm && parseResultSm?.urlset?.url?.length) {
        for (const { loc } of parseResultSm.urlset.url) {
          linkList.push(loc[0]);
        }
      }
    }

    return linkList;
  }
}
