import {SequenceApplication} from '../..';
import {
  createRestAppClient,
  givenHttpServerConfig,
  Client,
} from '@loopback/testlab';

export async function setupApplication(): Promise<AppWithClient> {
  const restConfig = givenHttpServerConfig({
    host: process.env.HOST || '127.0.0.1',
    port: + (process.env.PORT || '3000'),
  });

  // 设置测试用的数据库配置
  process.env.MYSQL_HOST = process.env.MYSQL_HOST || '127.0.0.1';
  process.env.MYSQL_PORT = process.env.MYSQL_PORT || '3306';
  process.env.MYSQL_USER = process.env.MYSQL_USER || 'root';
  process.env.MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 'Duyanxiang2015!';
  process.env.MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'coffeeshop';

  const app = new SequenceApplication({
    rest: restConfig,
  });

  await app.boot();
  await app.start();

  const client = createRestAppClient(app);

  return {app, client};
}

export interface AppWithClient {
  app: SequenceApplication;
  client: Client;
}
