import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SERVICES } from './services/index.service';
import { GATEWAYS } from './gateways/index.gateway';
import { CONTROLLERS } from './controllers/index.controller';
import { MODELS } from './models/index.model';
import { ParameterService } from './services/parameter/parameter.service';
import { ParameterController } from './controllers/parameter/parameter.controller';
import { ValueKwhService } from './services/value-kwh/value-kwh.service';
import { ValueKwhController } from './controllers/value-kwh/value-kwh.controller';
import { ElectrodomesticGateway } from './gateways/electrodomestic.gateway';
import { MorganMiddleware } from '@nest-middlewares/morgan';

const URLDB = process.env.urlDB || 'mongodb://localhost:27017/energyal';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.URLDB || URLDB, { useNewUrlParser: true }),
    MongooseModule.forFeature([...MODELS]),
  ],
  controllers: [...CONTROLLERS, ParameterController, ValueKwhController],
  providers: [
    ...SERVICES, ...GATEWAYS, ParameterService, ValueKwhService, ElectrodomesticGateway],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // IMPORTANT! Call Middleware.configure BEFORE using it for routes
    MorganMiddleware.configure((tokens, req, res) => {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
      ].join(' ');
    });
    consumer.apply(MorganMiddleware).forRoutes(
      { path: '*', method: RequestMethod.ALL },
    );
  }
}
