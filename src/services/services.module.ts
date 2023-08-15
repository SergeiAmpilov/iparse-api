import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceSchema } from './model/services.model';
import { ServicesService } from './services.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: ServiceSchema,
        name: 'service',
      },
    ]),
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
