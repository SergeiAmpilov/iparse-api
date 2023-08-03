import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { ServicesService } from './services.service';
import { SERVICE_NOT_FOUND } from './services.constants';

@Controller('services')
export class ServicesController {

  constructor(
    private readonly servicesService: ServicesService,
  ) {}

  @Get()
  async getList(@Query() query) {
    const { count, shift } = query;

    return {
      ok: 'get messages list',
    }
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const service = this.servicesService.findById(id);

    if (!service) {
      throw new NotFoundException(SERVICE_NOT_FOUND);
    }

    return service;
  }

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
