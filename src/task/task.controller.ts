import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import TaskDto from './task.dto';

@Controller({ path: 'tasks' })
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':taskId')
  getTask(@Param('taskId') taskId: string) {
    return this.taskService.getTasksByTaskId(taskId);
  }

  @Post('')
  async createComment(
    @Param('taskId') taskId: string,
    @Body() taskDto: TaskDto,
  ) {
    try {
      const task = await this.taskService.createTask(taskDto);

      return {
        id: task.id,
        status: 'success',
      };
    } catch (e) {
      return {
        status: 'failed',
        message: e.message,
      };
    }
  }
}
