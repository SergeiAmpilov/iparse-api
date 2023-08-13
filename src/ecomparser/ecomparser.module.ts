import { Module } from '@nestjs/common';
import { EcomparserController } from './ecomparser.controller';

@Module({
  controllers: [EcomparserController]
})
export class EcomparserModule {}
