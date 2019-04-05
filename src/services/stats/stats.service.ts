import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NewExpression } from '@babel/types';
import { Observable } from 'rxjs';
import { date } from 'joi';
import { IMeasurment } from '../../interfaces/measurment.interface';
import { fdatasyncSync } from 'fs';
import { ElectrodomesticService } from '../electrodomestic/electrodomestic.service';
import { error } from 'util';

@Injectable()
export class StatsService {
// @ts-ignore
  constructor(
    // @ts-ignore
    @InjectModel('Measurement') private measurementModel: Model,
    // @ts-ignore
    @InjectModel('User') private userModel: Model,
    // @ts-ignore
    @InjectModel('Electrodomestic') private electrodomesticModel: Model,
    // @ts-ignore
    @InjectModel('Electrodomestic') private meterModel: Model,
    private electrodomesticService: ElectrodomesticService,
  ) {
  }

  // @ts-ignore
  async electrodomestic(start: Date, end: Date, idMeter: string, length: number) {
    const kWh = [];
    const money = [];
    for (let i = 0; i < length; i++) {
      kWh.push(0);
    }
    for (let i = 0; i < length; i++) {
      money.push(0);
    }
    const data: [IMeasurment] = await this.measurementModel.find({
      meter: idMeter,
      startTime: { $gte: start, $lte: end },
    }, 'endTime startTime kwh value');
    const dates = [];
    const div = (end.getTime() - start.getTime()) / length;
    for (let i = 0; i <= length; i++) {
      const itemDate = new Date(start.getTime() + (i * div));
      dates.push(itemDate);
    }
    let aux = 0;
    for (let j = 0; j < data.length; j++) {
      if (data[j].startTime < dates[aux + 1]) {
        kWh[aux] += data[j].kwh;
        money[aux] += data[j].value;
      } else {
        aux++;
      }
    }
    return { kWh, money };
  }

  // @ts-ignore
  async global(start?: Date, end?: Date, user: string, length?: number) {
    const kWh = [];
    const money = [];
    let meters = [];
    for (let i = 0; i < length; i++) {
      kWh.push(0);
    }
    for (let i = 0; i < length; i++) {
      money.push(0);
    }
    console.log('1');
    await this.userModel.findById(user, 'electrodomestics')
      .populate('electrodomestic').then(async value => {
        console.log('2');
        const idsElectro = value.electrodomestics.map((electro) => electro.electrodomestic);
        const auxMeters = await this.electrodomesticModel.find({ _id: { $in: idsElectro } });
        console.log('3');
        meters = auxMeters.map((item) => item.meter);
      });
    console.log('4');
    const data: [IMeasurment] = await this.measurementModel.find({
      meter: { $in: meters },
      startTime: { $gte: start, $lte: end },
    }, 'endTime startTime kwh value');
    const dates = [];
    const div = (end.getTime() - start.getTime()) / length;
    for (let i = 0; i <= length; i++) {
      const itemDate = new Date(start.getTime() + (i * div));
      dates.push(itemDate);
    }
    let aux = 0;
    for (let j = 0; j < data.length; j++) {
      if (data[j].startTime < dates[aux + 1]) {
        kWh[aux] += data[j].kwh;
        money[aux] += data[j].value;
      } else {
        aux++;
      }
    }
    return { kWh, money };
  }

}
