import {ApplicationConfig, CoffeeshopApplication} from './application';

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  // 配置 CORS
  options.rest = options.rest || {};
  options.rest.cors = {
    origin: '*', // 允许所有来源
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // 允许的 HTTP 方法
    allowedHeaders: 'Content-Type,Authorization', // 允许的自定义请求头
    credentials: true, // 是否允许携带 Cookie
  };

  const app = new CoffeeshopApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3030), // 修改为3030端口
      host: process.env.HOST || '127.0.0.1',
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        setServersFromRequest: true,
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
