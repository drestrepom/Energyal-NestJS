import { Body, Controller, Post } from '@nestjs/common';
import { StatsService } from '../../services/stats/stats.service';

@Controller('stats')
export class StatsController {
  constructor(private statsService: StatsService) {
  }

  @Post()
  statsElectrodomestic(@Body() body) {
    return this.statsService.electrodomestic(new Date(body.startDate), new Date(body.endDate), body.idMeter, body.length);
  }
  @Post('user')
  statsUser(@Body() body) {
    console.log(new Date(body.endDate).toString());
    return this.statsService.global(new Date(body.startDate), new Date(body.endDate), body.user, body.length);
  }
}
