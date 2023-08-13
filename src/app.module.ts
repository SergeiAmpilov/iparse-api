import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicesModule } from './services/services.module';
import { UsersModule } from './users/users.module';
import { ResourcesModule } from './resources/resources.module';
import { TasksModule } from './tasks/tasks.module';
import { ArticlesModule } from './articles/articles.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SeoparserModule } from './seoparser/seoparser.module';
import { EcomparserModule } from './ecomparser/ecomparser.module';

@Module({
  imports: [ 
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/iparseapidb'),
    ServicesModule, 
    UsersModule, 
    ResourcesModule, 
    TasksModule, 
    ArticlesModule, SeoparserModule, EcomparserModule 
  ],
  controllers: [AppController ],
  providers: [AppService],
})
export class AppModule {}
