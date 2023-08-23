import { Module } from '@nestjs/common';
import { SeotaskController } from './seotask.controller';
import { SeotaskService } from './seotask.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SeoTaskSchema } from './model/seotask.model';
import { SeoparserModule } from 'src/seoparser/seoparser.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: SeoTaskSchema,
        name: 'seotask'
      }
    ]),
    SeoparserModule
  ],
  controllers: [SeotaskController],
  providers: [SeotaskService]
})
export class SeotaskModule {}
