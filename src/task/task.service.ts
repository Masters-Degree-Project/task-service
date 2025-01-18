import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './task.schema';
import { Model } from 'mongoose';
import TaskDto from './task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private commentModel: Model<Task>) {}

  getTasksByTaskId(taskId: string) {
    return this.commentModel.find({ taskId }).exec();
  }

  createTask(task: TaskDto) {
    return this.commentModel.create({
      ...task,
      createdAt: new Date(),
    });
  }
}
