import { NestFactory } from '@nestjs/core';
import { ServiceModule } from './service.module';
import { ValidationPipe } from '@nestjs/common';
import { setupGracefulShutdown } from 'nestjs-graceful-shutdown';

async function bootstrap() {
  const service = await NestFactory.create(ServiceModule);
  service.useGlobalPipes(new ValidationPipe());

  setupGracefulShutdown({ app: service });

  const port = process.env.SERVICE_PORT ?? 3000;
  console.log('Service is running on port:', port);
  await service.listen(port);
}

bootstrap();
