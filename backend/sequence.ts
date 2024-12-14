import {inject} from '@loopback/core';
// import {
//   AuthenticateFn,
//   AuthenticationBindings,
// } from '@loopback/authentication';
import {
  FindRoute,
  InvokeMethod,
  ParseParams,
  Reject,
  RequestContext,
  RestBindings,
  Send,
  SequenceHandler,
} from '@loopback/rest';

import {MiddlewareSequence} from '@loopback/rest';

// 自定义请求处理序列



const SequenceActions = RestBindings.SequenceActions;

export class MySequence implements SequenceHandler {
  constructor(
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) protected send: Send,
    @inject(SequenceActions.REJECT) protected reject: Reject,
    // @inject(AuthenticationBindings.AUTH_ACTION)
    // protected authenticateRequest: AuthenticateFn, // 注入身份验证功能
  ) {}

  async handle(context: RequestContext): Promise<void> {
    try {
      const {request, response} = context;

      if (request.method === 'OPTIONS') {
        response.statusCode = 204; // No Content
        response.setHeader('Access-Control-Allow-Origin', '*'); // 替换为具体的前端地址
        response.setHeader(
          'Access-Control-Allow-Methods',
          'GET,POST,PUT,DELETE,OPTIONS',
        );
        response.setHeader(
          'Access-Control-Allow-Headers',
          'Content-Type,Authorization',
        );
        response.end();
        return;
      }


      // // 1. 验证身份
      // await this.authenticateRequest(request);

      // 2. 找到路由
      const route = this.findRoute(request);

      // 3. 解析参数
      const args = await this.parseParams(request, route);

      // 4. 调用控制器方法
      const result = await this.invoke(route, args);

      // 5. 返回响应
      this.send(response, result);
    } catch (err) {
      // 6. 错误处理
      this.reject(context, err);
    }
  }
}
