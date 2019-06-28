import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ParameterDto } from '../../dto/parameter.dto';


@Injectable()
export class ParameterService {
  // @ts-ignore
  constructor(@InjectModel('Parameter') private parameterModel: Model) {
  }

  async add(parameter: ParameterDto) {
    return await new this.parameterModel(parameter).save();
  }

  update(dates: { user, scale, kwh, money }) {
    this.parameterModel.findOne({ user: dates.user }, ((err, res) => {
      if (res) {
        res['parameters'][dates.scale] = {
          kwh: dates.kwh,
          money: dates.money,
        };
        res.save().then(value => { });
      }
    }));
  }

  async get(user) {
    return await this.parameterModel.findOne({ user });
  }
}
