import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MikroOrmErrorInterceptor } from './common/interceptors/mikro-orm-error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new MikroOrmErrorInterceptor());
  await app.listen(3000);
}
bootstrap();
