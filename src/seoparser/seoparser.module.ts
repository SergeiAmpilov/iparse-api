import { Module } from '@nestjs/common';
import { SeoparserController } from './seoparser.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SeoParserSchema } from './model/seoparser.model';
import { SeoparserService } from './seoparser.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: SeoParserSchema,
        name: 'seoparser',
      }
    ]),
    UsersModule,
  ],
  controllers: [SeoparserController],
  providers: [SeoparserService],
  exports: [SeoparserService],
})
export class SeoparserModule {}
