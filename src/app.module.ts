import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SERVICES } from './services/index.service';
import { GATEWAYS } from './gateways/index.gateway';
import { CONTROLLERS } from './controllers/index.controller';
import { MODELS } from './models/index.model';
import { ParameterService } from './services/parameter/parameter.service';
import { ParameterController } from './controllers/parameter/parameter.controller';

const URLDB = process.env.urlDB || 'mongodb://localhost:27017/enrgyal';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.URLDB || 'mongodb://localhost:27017/enrgyal', { useNewUrlParser: true }),
    MongooseModule.forFeature([...MODELS]),
  ],
  controllers: [...CONTROLLERS, ParameterController],
  providers: [
    ...SERVICES, ...GATEWAYS, ParameterService],
})
export class AppModule {
}
