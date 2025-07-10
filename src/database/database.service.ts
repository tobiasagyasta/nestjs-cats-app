import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Client } from 'pg';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private client: Client;

  constructor(private configService: ConfigService) {
    const host = this.configService.get<string>('DATABASE_HOST');
    const port = this.configService.get<number>('DATABASE_PORT');
    const user = this.configService.get<string>('DATABASE_USER');
    const password = this.configService.get<string>('DATABASE_PASSWORD');
    const database = this.configService.get<string>('DATABASE_NAME');

    // TEMP LOGS FOR DEBUGGING — REMOVE IN PRODUCTION!
    console.log('[Database Config]');
    console.log({ host, port, user, password, database });

    if (!password || typeof password !== 'string') {
      throw new Error(
        '❌ DATABASE_PASSWORD must be defined as a string in your environment',
      );
    }

    this.client = new Client({
      host,
      port,
      user,
      password,
      database,
    });
  }

  async onModuleInit() {
    await this.client.connect();
    console.log('✅ PostgreSQL connected');
  }

  async onModuleDestroy() {
    await this.client.end();
  }

  getClient(): Client {
    return this.client;
  }
}
