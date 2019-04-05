import { Body, Controller, Delete, Get, Param, Post, Query, Request } from '@nestjs/common';
import { IElectrodomestic } from '../../interfaces/electrodomestic.interface';
import { ElectrodomesticService } from '../../services/electrodomestic/electrodomestic.service';
import { Http2ServerRequest } from 'http2';
import { JsonWebToken } from '../../utils/json-web-token';
import { DeleteBlankSpacePipe } from '../../pipes/delete-blank-space.pipe';

@Controller('electrodomestic')
export class ElectrodomesticController {
  constructor(private electrodomesticService: ElectrodomesticService) {
  }

  @Post()
  async register(@Body(DeleteBlankSpacePipe) body: IElectrodomestic, @Request() request: Http2ServerRequest) {
    const user = await JsonWebToken.verify(request.headers.authorization);
    return await this.electrodomesticService.register(body, user);
  }

  @Get(':id')
  async get(@Param('id') id) {
    return await this.electrodomesticService.getOne(id);
  }

  @Delete(':id')
  delete() {

  }
}
