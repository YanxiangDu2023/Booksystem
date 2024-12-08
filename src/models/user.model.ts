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
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

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
