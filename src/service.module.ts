import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './task/task.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConsulModule } from './consul/consul.module';
import { GracefulShutdownModule } from 'nestjs-graceful-shutdown';
import mongodbConfig from './config/mongodb.config';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    GracefulShutdownModule.forRoot(),
    ConfigModule.forRoot({
      load: [mongodbConfig],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongodb.uri'),
      }),
      inject: [ConfigService],
    }),
    TaskModule,
    JwtModule.register({
      global: true,
    }),
    ConsulModule,
    HealthModule,
  ],
})
export class ServiceModule {}
