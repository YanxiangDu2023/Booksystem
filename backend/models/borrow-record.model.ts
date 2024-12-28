import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'borrow_records', // 表名
})
export class BorrowRecord extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  bookId: number;

  @property({
    type: 'string',
    nullable: true,
  })
  borrower?: string | null; // 允许字符串或 null

  @property({
    type: 'number',
    required: true,
  })
  borrowerId: number | null; // 新增借阅者 ID


  @property({
    type: 'date', // 注意这里使用 'date' 而不是 'string'
    required: true,
  })
  borrowDate: Date;


  @property({
    type: 'date',
    nullable: true,
    default: null,   // 默认值为 null
  })
  returnDate?: Date | null;


  // 新增字段
  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  author: string;

  @property({
    type: 'number',
    required: true,
  })
  publishedYear: number;

  @property({
    type: 'string',
    required: true,
  })
  genre: string;


  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<BorrowRecord>) {
    super(data);
  }
}

export interface BorrowRecordRelations {
  // describe navigational properties here
}

export type BorrowRecordWithRelations = BorrowRecord & BorrowRecordRelations;
