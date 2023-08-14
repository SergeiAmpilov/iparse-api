import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { ServicesService } from './services.service';
import { SERVICE_ALREADY_EXIST, SERVICE_NOT_FOUND } from './services.constants';
import { JwtAuthGuard } from 'src/users/guards/jwt.guard';

@Controller('services')
export class ServicesController {

  constructor(
    private readonly servicesService: ServicesService,
  ) {}

  @UseGuards(new JwtAuthGuard())
  @Get()
  async getList(@Query() query) {
    const { count, shift } = query;

    return this.servicesService.getList();
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
  async create(@Body() dto: CreateServiceDto) {

    const service = await this.servicesService.findBySlug(dto.slug);

    if (service) {
      throw new BadRequestException(SERVICE_ALREADY_EXIST);
    }

    return this.servicesService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const service = await this.servicesService.findById(id);

    if (!service) {
      throw new NotFoundException(SERVICE_NOT_FOUND);
    }

    return this.servicesService.delete(id);

  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() dto: CreateServiceDto
  ) {

    const service = await this.servicesService.findById(id);

    if (!service) {
      throw new NotFoundException(SERVICE_NOT_FOUND);
    }

    return this.servicesService.update(id, dto);

  }

}
