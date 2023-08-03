import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicesModule } from './services/services.module';
import { UsersModule } from './users/users.module';
import { ResourcesModule } from './resources/resources.module';
import { TasksModule } from './tasks/tasks.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [ ServicesModule, UsersModule, ResourcesModule, TasksModule, ArticlesModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
