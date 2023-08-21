import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SeoParserTaskDocument } from './model/seoparser.task.model';
import axios from 'axios';
import { ProxyConfig } from './proxy.config';
import { parseStringPromise } from 'xml2js';
import { PageTags } from './types/page.tag';
import puppeteer from 'puppeteer-extra';
import { Browser, Page } from 'puppeteer';
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
import { path } from 'app-root-path';
const xl = require('excel4node');





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

    const filename = await this.generateFile(result);
    
    const file = 'demo file';
    const finish = new Date();
    const parseResult = {
      parser: id,
      resource,
      start,
      finish,
      count: result.length,
      file: filename,
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

    await page.goto(url, { waitUntil: "domcontentloaded" });

    const res = await page.evaluate((): PageTags => {

      const title = document.querySelector('title')?.innerText;
      const description = document.querySelector('meta[name=description]')?.getAttribute('content')?.toString();
      const h1 = document.querySelector('h1')?.innerText.toString();

      return { title, description, h1 };

    });


    return {
      ...res,
      url,
    }
  }

  private async generateFile(result: PageTags[]): Promise<string | undefined> {

    const fileName = `seodata-${Math.floor(Date.now() / 1000)}.xls`;
    const filePath = `${path}/parsefiles/${fileName}`;
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet('Parse result');

    let rowCounter = 0;

    for (const record of result) {
      rowCounter++;

      ws.cell(rowCounter, 1).string(record.url ?? '');
      ws.cell(rowCounter, 2).string(record.title ?? '');
      ws.cell(rowCounter, 3).string(record.description ?? '');
      ws.cell(rowCounter, 4).string(record.h1 ?? '');      
    }

    try {
      await wb.write(filePath);
      return fileName;
    } catch (e) {
      return undefined;
    }

  }
}
