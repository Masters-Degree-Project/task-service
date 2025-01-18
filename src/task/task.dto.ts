import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class TaskDto {
  @IsNotEmpty()
  @IsNumber()
  projectId: number;

  @IsNotEmpty()
  @IsNumber()
  assigneeId: number;

  @IsNotEmpty()
  @IsNumber()
  reporterId: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsIn(['todo', 'in-progress', 'done'])
  status: 'todo' | 'in-progress' | 'done';
}
