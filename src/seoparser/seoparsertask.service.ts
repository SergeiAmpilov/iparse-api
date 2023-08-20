import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SeoParserTaskDocument } from './model/seoparser.task.model';
import axios from 'axios';
import { ProxyConfig } from './proxy.config';
import { parseStringPromise } from 'xml2js';
import { PageTags } from './types/page.tag';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Browser, Page } from 'puppeteer';





@Injectable()
export class SeoparsertaskService {
  constructor(
    @InjectModel('seoparsertask')
    private readonly seoParserTaskModel: Model<SeoParserTaskDocument>,
  ) {}

  async runParsing(id: string, resource: string) {
    const start = new Date();


    const result: PageTags[] = [];

    // links
    const pagesList = await this.getPagesList(`${resource}sitemap.xml`);


    // tags
    puppeteer.use(StealthPlugin());

    const browser: Browser = await puppeteer.launch({
      // headless: true,
      defaultViewport: null,
      args: [`--proxy-server=${ProxyConfig.host}:${ProxyConfig.port}`]
    });

    const page: Page = await browser.newPage();

    for (const pageUrl of pagesList) {
      const res = await this.getPageTags(pageUrl, page);
      result.push(res);
    }

    browser.close();


    
    const file = 'demo file';
    const finish = new Date();
    const parseResult = {
      parser: id,
      resource,
      start,
      finish,
      count: result.length,
      file,
    };

    this.seoParserTaskModel.create(parseResult);
  }

  async getTasksByParser(parser: string) {
    return this.seoParserTaskModel.find({ parser }).exec();
  }

  async getPagesList(sitemapUrl: string): Promise<string[]> {

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

  private async getPageTags(url: string, page: Page): Promise<PageTags> {

    const res = await page.evaluate((): PageTags => {
      return {
        title: document.querySelector('title')?.innerText,
        description: document.querySelector('meta[name=description]')?.getAttribute('content')?.toString(),
        h1: document.querySelector('h1')?.innerText.toString(),
      }
    });

    return {
      ...res,
      url,
    }
  }
}
