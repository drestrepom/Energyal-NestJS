import { Body, Controller, Get, Post } from '@nestjs/common';
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
    console.log(body);
    return this.statsService.global(new Date(body.startDate), new Date(body.endDate), body.user, body.length);
  }

  @Post('sum/user')
  async sumUser(@Body() body) {
    return await this.statsService.sumUser(body.user, new Date(body.startDate), new Date(body.endDate));
  }
}
