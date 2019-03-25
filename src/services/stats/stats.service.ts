import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NewExpression } from '@babel/types';
import { Observable } from 'rxjs';
import { date } from 'joi';
import { IMeasurment } from '../../interfaces/measurment.interface';
import { fdatasyncSync } from 'fs';

@Injectable()
export class StatsService {
// @ts-ignore
  constructor(@InjectModel('Measurement') private measurementModel: Model) {
  }

  // @ts-ignore
  async electrodomestic(start: Date, end: Date, idMeter: string) {
    const lenght = 7;
    const kWh = [];
    for (let i = 0; i < lenght; i++) {
      kWh.push(0);
    }
    const data: [IMeasurment] = await this.measurementModel.find({
      meter: idMeter,
      startTime: { $gte: start, $lte: end },
    }, 'endTime startTime kwh value');
    const dates = [];
    const div = (end.getTime() - start.getTime()) / lenght;
    for (let i = 0; i <= lenght; i++) {
      const itemDate = new Date(start.getTime() + (i * div));
      dates.push(itemDate);
    }
    let aux = 0;
    for (let j = 0; j < data.length; j++) {
      if (data[j].startTime < dates[aux + 1]) {
        kWh[aux] += data[j].kwh * 3600000;
      } else {
        aux++;
      }
    }
    return kWh;
  }
}
