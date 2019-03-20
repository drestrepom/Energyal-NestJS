import { Body, Controller, Get, Param, Post, Query, Request } from '@nestjs/common';
import { IElectrodomestic } from '../../interfaces/electrodomestic.interface';
import { ElectrodomesticService } from '../../services/electrodomestic/electrodomestic.service';
import { Http2ServerRequest } from 'http2';
import { JsonWebToken } from '../../utils/json-web-token';

@Controller('electrodomestic')
export class ElectrodomesticController {
  constructor(private electrodomesticService: ElectrodomesticService) {
  }

  @Post()
  async register(@Body() body: IElectrodomestic, @Request() request: Http2ServerRequest) {
    const user = await JsonWebToken.verify(request.headers.authorization);
    return await this.electrodomesticService.register(body, user);
  }

  @Get()
 async get(@Query() query) {
    console.log('query', query);
    return await this.electrodomesticService.getOne(query.id);
  }
}
