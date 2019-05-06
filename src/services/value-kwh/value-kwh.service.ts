import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { model, Model } from 'mongoose';

@Injectable()
export class ValueKwhService {
  // @ts-ignore
  constructor(@InjectModel('valueKwh') private valueKwhModel: Model) {
  }

  async register(values) {
    return await new this.valueKwhModel(values).save();
  }

  async get(stratum) {
    return await this.valueKwhModel.findOne({ stratum });
  }
}
