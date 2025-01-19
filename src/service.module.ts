import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './task/task.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/tasks-service'),
    ConfigModule.forRoot(),
    TaskModule,
    JwtModule.register({
      global: true,
    }),
  ],
})
export class ServiceModule {}
