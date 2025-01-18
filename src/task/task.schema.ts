import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  id: string;

  @Prop({ required: true, index: 1 })
  projectId: number;

  @Prop({ required: true, index: 1 })
  assigneeId: number;

  @Prop({ required: true, index: 1 })
  reporterId: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: false, default: 'todo' })
  status: 'todo' | 'in-progress' | 'done';

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

TaskSchema.index({ userId: 1, taskId: 1 });

export const TasksMongooseModule = MongooseModule.forFeature([
  { name: Task.name, schema: TaskSchema },
]);
