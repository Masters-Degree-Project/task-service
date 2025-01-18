import { Module } from '@nestjs/common';
import { TasksMongooseModule } from './task.schema';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [TasksMongooseModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
