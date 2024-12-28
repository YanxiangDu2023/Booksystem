import {Entity, model, property} from '@loopback/repository';

// @model({settings: {strict: false}})
// @model({settings: {strict: false}})

@model({name: 'books'}) // 确保与表名一致
export class Book extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

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
    type: 'string',
  })
  genre?: string;

  @property({
    type: 'number',
  })
  publishedYear?: number;

  ///////////////////////////////////////////

  @property({
    type: 'boolean',
    default: false,
  })
  isBorrowed?: boolean;

  @property({
    type: 'string',
    nullable: false,
  })
  borrower?: string | null;

  @property({
    type: 'number',
    required: false,
  })
  borrowerId?: number | null; // 新增借阅者 ID

  ////////////////

  @property({
    type: 'date',
    nullable: false,
  })
  borrowDate?: Date | null;


  @property({
    type: 'date',
    nullable: true,
    default: null,   // 默认值为 null
  })
  returnDate?: Date | null;


//////////////////

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Book>) {
    super(data);
  }
}

export interface BookRelations {
  // describe navigational properties here
}

export type BookWithRelations = Book & BookRelations;
