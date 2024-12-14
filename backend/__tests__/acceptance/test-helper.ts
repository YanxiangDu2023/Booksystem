import {
  Client,
  createRestAppClient,
  givenHttpServerConfig,
} from '@loopback/testlab';
import {CoffeeshopApplication} from '../..';

export async function setupApplication(): Promise<AppWithClient> {
  // 设置 MySQL 环境变量（仅在测试时使用）
  process.env.MYSQL_HOST = '127.0.0.1';
  process.env.MYSQL_PORT = '3306';
  process.env.MYSQL_USER = 'root';
  process.env.MYSQL_PASSWORD = 'yourpassword';
  process.env.MYSQL_DATABASE = 'coffeeshop';

  const restConfig = givenHttpServerConfig({
    host: '127.0.0.1',  // REST API 服务器地址
    port: 3000,          // REST API 服务器端口
  });

  const app = new CoffeeshopApplication({
    rest: restConfig,
  });

  await app.boot();
  await app.start();

  const client = createRestAppClient(app);

  return {app, client};
}

export interface AppWithClient {
  app: CoffeeshopApplication;
  client: Client;
}
