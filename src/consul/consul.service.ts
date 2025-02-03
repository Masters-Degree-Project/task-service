import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Consul from 'consul';

@Injectable()
export class ConsulService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly consul: Consul;
  private readonly serviceId: string;

  constructor(private readonly configService: ConfigService) {
    const consulConfig = this.configService.get('consul');

    this.consul = new Consul({
      host: consulConfig.host,
      port: consulConfig.port,
    });

    this.serviceId = consulConfig.serviceId;
  }

  async onApplicationBootstrap() {
    const consulConfig = this.configService.get('consul');

    try {
      await this.consul.agent.service.register({
        id: this.serviceId,
        name: consulConfig.serviceName,
        address: consulConfig.serviceIp,
        port: consulConfig.servicePort,
        tags: [
          ...consulConfig.tags,
          'traefik.enable=true',
          `traefik.http.routers.${consulConfig.serviceName}-router.rule=Headers(\`X-Service\`, \`${consulConfig.serviceName}\`)`,
          `traefik.http.routers.${consulConfig.serviceName}-router.service=${consulConfig.serviceName}`,
          `traefik.http.routers.${consulConfig.serviceName}-router.entryPoints=web`,
          `traefik.http.services.${consulConfig.serviceName}.loadBalancer.server.port=${consulConfig.servicePort}`,
        ],
        check: {
          name: `${consulConfig.serviceName}-service-check`,
          http: `http://${consulConfig.serviceIp}:${consulConfig.servicePort}/health`,
          interval: consulConfig.healthCheck.interval,
          timeout: consulConfig.healthCheck.timeout,
          deregistercriticalserviceafter:
            consulConfig.healthCheck.deregistercriticalserviceafter,
        },
      });

      console.log(`Service registered with Consul: ${this.serviceId}`);
    } catch (error) {
      console.error('Failed to register service with Consul:', error);
      throw error;
    }
  }

  async onApplicationShutdown(signal?: string) {
    try {
      await this.consul.agent.service.deregister(this.serviceId);
      console.log(`Service deregistered from Consul: ${this.serviceId}`);
    } catch (error) {
      console.error('Failed to deregister service from Consul:', error);
    }
  }
}
