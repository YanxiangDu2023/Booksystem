import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import {UserController} from './controllers/user-controller.controller';

export {ApplicationConfig};

export class CoffeeshopApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    options.rest = options.rest || {};

    // 正确配置 CORS
    options.rest.cors = {
      origin: 'http://localhost:3001', // 允许的前端地址
      methods: 'GET,POST,PUT,DELETE,OPTIONS', // 允许的 HTTP 方法
      allowedHeaders: 'Content-Type,Authorization', // 允许的自定义请求头
      credentials: true, // 是否允许携带 Cookie
    };

    super(options);

    // 设置自定义请求处理序列
    this.sequence(MySequence);

    // 设置默认主页
    this.static('/', path.join(__dirname, '../public'));

    // 配置 Rest Explorer
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    // 设置项目根目录
    this.projectRoot = __dirname;

    // 注册控制器
    this.controller(UserController);

    // 自定义 Boot 配置
    this.bootOptions = {
      controllers: {
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    // 打印所有注册的路由
    this.boot().then(() => {
      this.logRegisteredRoutes();
    });
  }

  /**
   * 打印所有已注册的路由
   */
  private async logRegisteredRoutes() {
    const apiSpec = await this.restServer.getApiSpec();
    const routes = apiSpec.paths || {};
    console.log('Registered routes:');
    Object.keys(routes).forEach(route => {
      console.log(`Path: ${route}, Methods: ${Object.keys(routes[route]).join(', ')}`);
    });
  }
}
