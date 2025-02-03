import { registerAs } from '@nestjs/config';

export default registerAs('mongodb', () => ({
  uri:
    `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}` ||
    'mongodb://localhost:27017/task-service',
}));
