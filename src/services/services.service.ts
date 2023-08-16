import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ServiceDocument } from './model/services.model';
import { Model } from 'mongoose';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel('service')
    private readonly serviceModel: Model<ServiceDocument>,
  ) {}

  async findById(id: string): Promise<ServiceDocument> {
    return this.serviceModel.findById(id).exec();
  }

  async findBySlug(slug: string) {
    return this.serviceModel.findOne({ slug }).exec();
  }

  async create(dto: CreateServiceDto) {
    return this.serviceModel.create(dto);
  }

  async delete(id: string) {
    return this.serviceModel.findByIdAndDelete(id).exec();
  }

  async update(id: string, dto: Omit<CreateServiceDto, 'slug'>) {
    return this.serviceModel
      .findByIdAndUpdate(id, dto, {
        new: true,
      })
      .exec();
  }

  async getList() {
    return this.serviceModel.find().exec();
  }
}
