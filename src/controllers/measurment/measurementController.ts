import { Body, Controller, Post } from '@nestjs/common';
import { MeasurementService } from '../../services/measurment/measurement.service';
import { MeterService } from '../../services/meter/meter.service';
import { ElectrodomesticService } from '../../services/electrodomestic/electrodomestic.service';
import { ElectrodomesticDto } from '../../dto/electrodomestic.dto';

@Controller('measurement')
export class MeasurementController {
  constructor(private measuremestService: MeasurementService,
              private meterService: MeterService,
              private electrodomesticService: ElectrodomesticService) {
  }

  @Post()
  async insertMeasurement(@Body() body) {
    const measurement = this.measuremestService.insert(body).catch(error => console.log (error));
    const meter = await this.meterService.getOne(body.meter);
    const electrodomestic: ElectrodomesticDto = await this.electrodomesticService.getOne(meter.electrodomestic._id);
    return { onOff: electrodomestic.onOff};
  }
}
