import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import TaskDto from './task.dto';
import { ServiceGuard } from 'src/service.guard';

@Controller({ path: 'api/v1/tasks' })
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':taskId')
  getTask(@Param('taskId') taskId: string) {
    return this.taskService.getTasksByTaskId(taskId);
  }

  @Post('')
  @UseGuards(ServiceGuard)
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
