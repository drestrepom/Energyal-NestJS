import { Body, Controller, Post } from '@nestjs/common';
import { MeasurementService } from '../../services/measurment/measurement.service';
import { IMeasurment } from '../../interfaces/measurment.interface';

@Controller('measurement')
export class MeasurementController {
  constructor(private measuremestService: MeasurementService) {
  }

  @Post()
  async register(@Body() body: IMeasurment) {
    // console.log(body);
    return await this.measuremestService.insert(body);
  }
}
