import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConsulService } from './consul.service';
import consulConfig from '../config/consul.config';

@Module({
  imports: [ConfigModule.forFeature(consulConfig)],
  providers: [ConsulService],
  exports: [ConsulService],
})
export class ConsulModule {}
