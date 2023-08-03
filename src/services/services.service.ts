import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ServiceDocument, ServiceModel } from './model/services.model';
import { Model } from 'mongoose';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel('service') private readonly serviceModel: Model<ServiceDocument> ,
  ) {  }

  async findById(id: string): Promise<ServiceDocument> {
    return this.serviceModel.findById(id).exec();
  }
}
