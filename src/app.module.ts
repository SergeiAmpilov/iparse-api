import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SeoparserModule } from './seoparser/seoparser.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/iparseapidb'),
    ConfigModule.forRoot(),
    UsersModule,
    SeoparserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
