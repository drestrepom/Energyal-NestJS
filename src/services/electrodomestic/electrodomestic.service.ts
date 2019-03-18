import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MeterService } from '../meter/meter.service';
import { IElectrodomestic } from '../../interfaces/electrodomestic.interface';
import { IMeter } from '../../interfaces/meter.interface';
import { CustomException } from '../../utils/custom-exception';

@Injectable()
export class ElectrodomesticService {
  // @ts-ignore
  constructor(@InjectModel('Electrodomestic') private electrodomesticModel: Model , private meterService: MeterService) {
  }

  async register(electro: IElectrodomestic, user: String) {
    const meter: IMeter = await this.meterService.getOne(electro.meter);
    electro.meter = meter._id;
    electro.users = [{ user }];
    const newElctro = new this.electrodomesticModel(electro);
    return await newElctro.save().catch(reason => {
      new CustomException().saveExceptio(reason);
    });
    // let electrodomestic = new Promise((resolve, reject) => {
    //   newElectrodomestic.save(async (err, result) => {
    //     if (err) {
    //       reject(err);
    //     } else {
    //       await new Meter({ electrodomestic: result._id, _id: this.body.meter }).addElectrodomestic();
    //       resolve(result);
    //     }
    //   });
    // });
    // return electrodomestic;
  }

}
