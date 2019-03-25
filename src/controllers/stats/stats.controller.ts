import { Body, Controller, Post } from '@nestjs/common';
import { StatsService } from '../../services/stats/stats.service';

@Controller('stats')
export class StatsController {
  constructor(private statsService: StatsService) {
  }

  @Post()
  statsElectrodomestic(@Body() body) {
    return this.statsService.electrodomestic(new Date(body.startDate), new Date(body.endDate), body.idMeter);
  }
}
