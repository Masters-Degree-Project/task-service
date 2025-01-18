import { NestFactory } from '@nestjs/core';
import { ServiceModule } from './service.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const service = await NestFactory.create(ServiceModule);
  service.useGlobalPipes(new ValidationPipe());
  await service.listen(process.env.PORT ?? 3000);
}
bootstrap();
