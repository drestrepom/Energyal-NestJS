import { Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { ElectrodomesticService } from '../../services/electrodomestic/electrodomestic.service';
import { Http2ServerRequest } from 'http2';
import { JsonWebToken } from '../../utils/json-web-token';
import { DeleteBlankSpacePipe } from '../../pipes/delete-blank-space.pipe';
import { ElectrodomesticDto } from '../../dto/electrodomestic.dto';

@Controller('electrodomestic')
export class ElectrodomesticController {
  constructor(private electrodomesticService: ElectrodomesticService) {
  }
  /**
   * Endpoint para registrar un elelctrodomestico <POST>
   *
   * @param {ElectrodomesticDto} body Extrae el cuerpo de la petición.
   * @param {Http2ServerRequest} request Extrae la respuesta del para la petición.
   * @returns Retorna electrodomestico registrado.
   * @memberof ElectrodomesticController
   */
  @Post()
  async register(@Body(DeleteBlankSpacePipe) body: ElectrodomesticDto, @Request() request: Http2ServerRequest) {
    const user = await JsonWebToken.verify(request.headers.authorization);
    return await this.electrodomesticService.register(body, user);
  }

  /**
   * Endpoint para apagar o enciender un electrodomestico <PUT>.
   *
   * @param {*} body extrae el cuerpo de la petición.
   * @returns Retorna el estado del el elctrodomestico que se apago o encendio.
   * @memberof ElectrodomesticController
   */
  @Put('onOff')
  async onOff(@Body() body) {
    return await this.electrodomesticService.updateOnOff(body.id);
  }

  /**
   * Endpoint para obtener la informacion de un electrodomestico especifico <GET>.
   *
   * @param {String} id Id del electrodomestico que se desea obtener.
   * @returns Retorna la informacion del electrodomestico.
   * @memberof ElectrodomesticController
   */
  @Get(':id')
  async getOne(@Param('id') id: String) {
    return await this.electrodomesticService.getOne(id);
  }

  /**
   * Endpoint para obtener las categorias de electrodomesticos.
   *
   * @returns Retorna las categorias disponibles
   * @memberof ElectrodomesticController
   */
  @Get('get/categories')
  getCategories() {
    return ElectrodomesticService.category();
  }
}
