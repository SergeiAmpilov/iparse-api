import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './model/user.model';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from './configs/jwt.config';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: UserSchema,
        name: 'user'
      }
    ]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
