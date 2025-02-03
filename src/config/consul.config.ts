import { registerAs } from '@nestjs/config';

export default registerAs('consul', () => ({
  host: process.env.CONSUL_HOST || 'localhost',
  port: parseInt(process.env.CONSUL_PORT, 10) || 8500,
  serviceName: process.env.SERVICE_NAME || 'task-service',
  serviceId:
    process.env.SERVICE_ID ||
    `task-service-${process.env.NODE_ENV}-${process.pid}`,
  serviceIp: process.env.SERVICE_IP || '127.0.0.1',
  servicePort: parseInt(process.env.SERVICE_PORT, 10) || 3000,
  tags: ['nestjs', 'microservice', 'task'],
  healthCheck: {
    timeout: '1s',
    interval: '10s',
    deregistercriticalserviceafter: '1m',
  },
}));
