import { Module } from '@nestjs/common';
import { SeotaskController } from './seotask.controller';

@Module({
  controllers: [SeotaskController]
})
export class SeotaskModule {}
