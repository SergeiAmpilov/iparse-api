import { Module } from '@nestjs/common';
import { SeoparserController } from './seoparser.controller';

@Module({
  controllers: [SeoparserController]
})
export class SeoparserModule {}
