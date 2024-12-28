import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import {inject} from '@loopback/core';
import * as bcrypt from 'bcryptjs';
import {User} from '../models';
import {UserRepository} from '../repositories';
// import {JWTService} from '../services/jwt-service.service';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    // @inject('services.JWTService')
    // private jwtService: JWTService,
  ) {}

  // 注册用户
  @post('/users/register')
  @response(200, {
    description: 'User registration',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async register(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            exclude: ['id'],
          }),
        },
      },
    })
    user: Omit<User, 'id'>,
  ): Promise<User> {
    const existingUser = await this.userRepository.findOne({where: {email: user.email}});
    if (existingUser) {
      throw new HttpErrors.BadRequest('Email is already registered');
    }
    user.password = await bcrypt.hash(user.password, 10);
    return this.userRepository.create(user);
  }

  // 登录用户
    // 登录用户
    @post('/users/login')
    @response(200, {
      description: 'User login',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {type: 'string'},
              user: {type: 'object'},
            },
          },
        },
      },
    })
    async login(
      @requestBody({
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email', 'password'],
              properties: {
                email: {type: 'string'},
                password: {type: 'string'},
              },
            },
          },
        },
      })
      credentials: {email: string; password: string},
    ): Promise<{message: string; user: Partial<User>}> {
      const user = await this.userRepository.findOne({where: {email: credentials.email}});
      if (!user) {
        throw new HttpErrors.Unauthorized('Invalid email or password');
      }

      const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
      if (!isPasswordValid) {
        throw new HttpErrors.Unauthorized('Invalid email or password');
      }

      // 返回成功消息和用户部分信息
      return {
        message: 'Login successful',
        user: {id: user.id, email: user.email, role: user.role},
      };
    }


//   @post('/login')
// async login(
//   @requestBody() credentials: {email: string; password: string},
// ): Promise<object> {
//   const user = await this.userRepository.findOne({
//     where: {email: credentials.email},
//   });

//   if (!user) {
//     throw new HttpErrors.Unauthorized('Invalid email or password');
//   }

//   // 验证密码（假设密码已哈希）
//   const isPasswordValid = await this.passwordHasher.compare(
//     credentials.password,
//     user.password,
//   );

//   if (!isPasswordValid) {
//     throw new HttpErrors.Unauthorized('Invalid email or password');
//   }

//   // 生成 JWT Token
//   const token = this.jwtService.generateToken({
//     id: user.id,
//     email: user.email,
//     role: user.role, // 包括角色信息
//   });

//   return {
//     message: 'Login successful',
//     user: {
//       id: user.id,
//       email: user.email,
//       role: user.role, // 添加角色信息
//     },
//     token, // 返回 JWT Token
//   };
// }



  // 管理员登陆页面
  @get('/admin')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(User) filter?: Filter<User>): Promise<User[]> {
    return this.userRepository.find(filter);
  }



// @get('/admin')
// @response(200, {
//   description: 'Admin panel data',
//   content: {'application/json': {schema: {type: 'object'}}},
// })
// async getAdminPanel(): Promise<object> {
//   const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//   if (!currentUser || currentUser.role !== 'admin') {
//     throw new HttpErrors.Forbidden('Access denied. Admins only.');
//   }

//   // 返回管理员相关数据
//   return {
//     message: 'Welcome to the admin panel!',
//     booksCount: await this.bookRepository.count(),
//     // usersCount: await this.UserRepository.count(),
//   };
// }






  // 删除用户（移除权限验证）
  @del('/users/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }

  // 更新用户信息
  @patch('/users/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }
}
