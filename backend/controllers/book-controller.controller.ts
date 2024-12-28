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
import {Book, BorrowRecord} from '../models';
import {BookRepository, BorrowRecordRepository} from '../repositories';
import {UserRepository} from '../repositories';

import {inject} from '@loopback/core';
// import {MiddlewareContext, Next} from '@loopback/rest';


// export async function adminAuthMiddleware(
//   context: MiddlewareContext,
//   next: Next,
// ) {
//   const currentUser = context.request.currentUser; // 假设用户信息存储在 request 中
//   if (!currentUser || currentUser.role !== 'admin') {
//     throw new HttpErrors.Forbidden('Access denied. Admins only.');
//   }
//   return next();
// }



export interface ExtendedBook extends Book {
  borrowDate?: Date | null;
  returnDate?: Date | null ;
  borrower?: string | null;
  borrowerId?: number| null; // 返回借阅者 ID
}

export class BookController {
  constructor(
    @repository(BookRepository)
    public bookRepository: BookRepository,
    @repository(BorrowRecordRepository)
    public borrowRecordRepository: BorrowRecordRepository,
  ) {}


// export async function adminAuthMiddleware(
//     context: MiddlewareContext,
//     next: Next,
//   ) {
//     const currentUser = context.request.currentUser; // 假设用户信息存储在 request 中
//     if (!currentUser || currentUser.role !== 'admin') {
//       throw new HttpErrors.Forbidden('Access denied. Admins only.');
//     }
//     return next();
//   }




 /** 管理员查看所有借阅记录 */





/** 管理员查看所有图书 */

@get('/admin/books')
@response(200, {
  description: 'Array of Book model instances',
  content: {
    'application/json': {
      schema: {
        type: 'array',
        items: getModelSchemaRef(Book, {includeRelations: true}),
      },
    },
  },
})
async findadmin(@param.filter(Book) filter?: Filter<Book>): Promise<Book[]> {
  return this.bookRepository.find(filter);
}


  /** 根据 ID 查询图书，返回额外借阅信息 */
  @get('/admin/books/{id}', {
    responses: {
      '200': {
        description: 'Book model instance with borrow details',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: {type: 'number'},
                title: {type: 'string'},
                author: {type: 'string'},
                genre: {type: 'string'},
                publishedYear: {type: 'number'},
                isBorrowed: {type: 'boolean'},
                borrower: {type: 'string', nullable: true},
                borrowDate: {type: 'string', format: 'date-time', nullable: true},
              },
            },
          },
        },
      },
    },
  })
  async findByIdadmin(@param.path.number('id') id: number): Promise<ExtendedBook> {
    const book = await this.bookRepository.findById(id);
    if (!book) throw new HttpErrors.NotFound('Book not found');

    const borrowRecord = await this.borrowRecordRepository.findOne({
      where: {bookId: id, returnDate: null},
    });

    return {
      ...book,
      borrower: borrowRecord?.borrower || null,
      borrowDate: borrowRecord?.borrowDate || null,
      borrowerId: borrowRecord?.borrowerId || null, // 返回借阅者 ID
    } as ExtendedBook
    // 使用类型断言来告诉 TypeScript 忽略类型检查
  }




   /** 管理员创建新图书 */
   @post('/admin/books')
   @response(200, {
     description: 'Book added successfully by admin',
     content: {'application/json': {schema: getModelSchemaRef(Book)}},
   })
  //  @use(adminAuthMiddleware) // 验证管理员权限
   async adminAddBook(
     @requestBody({
       content: {
         'application/json': {
           schema: getModelSchemaRef(Book, {
             title: 'NewBook',
             exclude: ['id'],
           }),
         },
       },
     })
     book: Omit<Book, 'id'>,
   ): Promise<Book> {
     return this.bookRepository.create(book);
   }




  //  /** 删除图书 */
  // @del('/books/{id}')
  // @response(204, {
  //   description: 'Book DELETE success',
  // })
  // async deleteById(@param.path.number('id') id: number): Promise<void> {
  //   await this.bookRepository.deleteById(id);
  // }


//  /** 管理员删除图书 */
@del('/admin/books/{id}')
@response(204, {
  description: 'Book deleted successfully by admin',
})
// @use(adminAuthMiddleware) // 验证管理员权限
async adminDeleteBook(@param.path.number('id') id: number): Promise<void> {
  const book = await this.bookRepository.findById(id);
  if (!book) {
    throw new HttpErrors.NotFound('Book not found');
  }
  await this.bookRepository.deleteById(id);
}



////////////////////////////////////////////////////////////////////////////////////////////



   /** 用户查询所有图书 */
  @get('/books')
  @response(200, {
    description: 'Array of Book model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Book, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Book) filter?: Filter<Book>): Promise<Book[]> {
    return this.bookRepository.find(filter);
  }


    /** 根据 ID 查询图书，返回额外借阅信息 */
    @get('/books/{id}', {
      responses: {
        '200': {
          description: 'Book model instance with borrow details',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: {type: 'number'},
                  title: {type: 'string'},
                  author: {type: 'string'},
                  genre: {type: 'string'},
                  publishedYear: {type: 'number'},
                  isBorrowed: {type: 'boolean'},
                  borrower: {type: 'string', nullable: true},
                  borrowDate: {type: 'string', format: 'date-time', nullable: true},
                },
              },
            },
          },
        },
      },
    })
    async findById(@param.path.number('id') id: number): Promise<ExtendedBook> {
      const book = await this.bookRepository.findById(id);
      if (!book) throw new HttpErrors.NotFound('Book not found');

      const borrowRecord = await this.borrowRecordRepository.findOne({
        where: {bookId: id, returnDate: null},
      });

      return {
        ...book,
        borrower: borrowRecord?.borrower || null,
        borrowDate: borrowRecord?.borrowDate || null,
        borrowerId: borrowRecord?.borrowerId || null, // 返回借阅者 ID
      } as ExtendedBook
      // 使用类型断言来告诉 TypeScript 忽略类型检查
    }


  /** 借阅图书 */
  /** 借阅图书 */
  @patch('/books/{id}/borrow')
  @response(200, {
    description: 'Book borrowed successfully',
    content: {'application/json': {schema: getModelSchemaRef(Book)}},
  })
  async borrowBook(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              borrowerId: {type: 'number'},
            },
            required: ['borrowerId'],
          },
        },
      },
    })
    requestData: {borrowerId: number},
  ): Promise<Book> {  // 修改返回类型
    const book = await this.bookRepository.findById(id);

    if (book.isBorrowed) {
      throw new HttpErrors.BadRequest('Book is already borrowed');
    }

    book.isBorrowed = true;
    book.borrowerId = requestData.borrowerId;
    book.borrowDate = new Date();

    await this.bookRepository.updateById(id, book);

    await this.borrowRecordRepository.create({
      bookId: id,
      borrowerId: requestData.borrowerId,
      borrowDate: new Date(),
      returnDate: null,
      title: book.title,
      author: book.author,
      publishedYear: book.publishedYear,
      genre: book.genre,
    });

    // 返回最新的书籍信息
    return this.bookRepository.findById(id);
  }





@get('/users/{id}/borrow-records')
@response(200, {
  description: 'List of borrow records for a specific user',
  content: {'application/json': {schema: {'x-ts-type': Book}}},
})
async getUserBorrowRecords(
  @param.path.number('id') userId: number,
): Promise<BorrowRecord[]> {
  return this.borrowRecordRepository.find({
    where: {borrowerId: userId}, // 根据 borrowerId 筛选
  });
}



   /** 归还图书 */
   @patch('/books/{id}/return')
   @response(200, {
     description: 'Mark a book as returned',
     content: {'application/json': {schema: getModelSchemaRef(Book)}},
   })
   async returnBook(@param.path.number('id') id: number): Promise<void> {
     const book = await this.bookRepository.findById(id);
     if (!book.isBorrowed) {
       throw new HttpErrors.BadRequest('Book is not borrowed');
     }

     // 更新 Book 表中的借阅者信息
     book.isBorrowed = false;
     book.borrower = null;
     book.borrowDate = null;
     book.returnDate = new Date();
     await this.bookRepository.updateById(id, book);

     // 更新借阅记录中的归还时间
     const borrowRecord = await this.borrowRecordRepository.findOne({
       where: {bookId: id, returnDate: null},
     });

     if (!borrowRecord) {
       throw new HttpErrors.NotFound('Borrow record not found');
     }

     borrowRecord.returnDate = new Date();
     await this.borrowRecordRepository.updateById(borrowRecord.id, borrowRecord);
   }

  }

