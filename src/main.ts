import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
  if (process.env.NODE_ENV === 'dev') {
    process.env.urlDB = 'mongodb://localhost:27017/enrgyal';
  } else {
    process.env.urlDB = 'mongodb+srv://admin:1193120855@cluster0-xjwrt.mongodb.net/enrgyal?retryWrites=true';
  }
  process.env.EXPITARION = process.env.EXPITARION || '12h';
  process.env.SEED = process.env.SEED || 'chucho';
  process.env.urlDB = process.env.urlDB || 'mongodb://localhost:27017/enrgyal';
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
