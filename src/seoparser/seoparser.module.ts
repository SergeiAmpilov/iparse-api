import { Module } from '@nestjs/common';
import { SeoparserController } from './seoparser.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SeoParserSchema } from './model/seoparser.model';
import { SeoParserTaskSchema } from './model/seoparser.task.model';
import { SeoparserService } from './seoparser.service';
import { UsersModule } from 'src/users/users.module';
import { SeoparsertaskService } from './seoparsertask.service';

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
    UsersModule,
  ],
  controllers: [SeoparserController],
  providers: [SeoparserService, SeoparsertaskService],
})
export class SeoparserModule {}
