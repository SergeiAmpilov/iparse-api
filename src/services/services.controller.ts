import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';

@Controller('services')
export class ServicesController {

  @Get()
  async getList(@Query() query) {
    const { count, shift } = query;
  }

  @Get(':id')
  async get(@Param('id') id: string) {  }

  @Post('create')
  async create(@Body() dto: CreateServiceDto) { }

  @Delete(':id')
  async delete(@Param('id') id: string) {}

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() dto: CreateServiceDto
  ) {}

}
