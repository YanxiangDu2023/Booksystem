import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'users', // 数据库表名
  settings: {strict: false}, // 保留其他设置
})
export class User extends Entity {
  @property({
    type: 'string', // 确保类型与数据库一致
    id: true,
    generated: true, // 由数据库自动生成
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      format: 'email', // 验证 email 格式
    },
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;


///////////////////////////////
@property({
  type: 'string',
  required: true,
  default: 'user', // 默认角色是普通用户
  jsonSchema: {
    enum: ['user', 'admin'], // 限定角色只能是 'user' 或 'admin'
  },
})
role: 'user' | 'admin'; // 类型约束为枚举

/////////////////////////////////


  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
