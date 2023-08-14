import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './model/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: UserSchema,
        name: 'user'
      }
    ]),
    ConfigModule,
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
