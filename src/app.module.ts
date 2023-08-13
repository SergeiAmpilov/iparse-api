import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicesModule } from './services/services.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { ArticlesModule } from './articles/articles.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SeoparserModule } from './seoparser/seoparser.module';
import { EcomparserModule } from './ecomparser/ecomparser.module';
import { ExamplesModule } from './examples/examples.module';

@Module({
  imports: [ 
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/iparseapidb'),
    ServicesModule, 
    UsersModule, 
    TasksModule, 
    ArticlesModule, SeoparserModule, EcomparserModule, ExamplesModule 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
