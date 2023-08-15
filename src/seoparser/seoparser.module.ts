import { Module } from '@nestjs/common';
import { SeoparserController } from './seoparser.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SeoParserSchema } from './model/seoparser.model';
import { SeoParserTaskSchema } from './model/seoparser.task.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: SeoParserSchema,
        name: 'seoparser',
      },
      {
        schema: SeoParserTaskSchema,
        name: 'seoparsertask',
      },
    ]),
  ],
  controllers: [SeoparserController],
})
export class SeoparserModule {}
