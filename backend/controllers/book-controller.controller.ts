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

export interface ExtendedBook extends Book {
  borrowDate?: Date;
  returnDate?: Date;
  borrower?: string;
}

export class BookController {
  constructor(
    @repository(BookRepository)
    public bookRepository: BookRepository,
    @repository(BorrowRecordRepository)
    public borrowRecordRepository: BorrowRecordRepository,
  ) {}

  @post('/books')
  @response(200, {
    description: 'Book model instance',
    content: {'application/json': {schema: getModelSchemaRef(Book)}},
  })
  async create(
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

  @del('/books/{id}')
  @response(204, {
    description: 'Book DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.bookRepository.deleteById(id);
  }

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

  @patch('/books/{id}/borrow')
  @response(200, {
    description: 'Mark a book as borrowed',
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
              borrower: {type: 'string'},
            },
          },
        },
      },
    })
    requestData: {borrower: string},
  ): Promise<void> {
    const book = await this.bookRepository.findById(id);
    if (book.isBorrowed) {
      throw new HttpErrors.BadRequest('Book is already borrowed');
    }

    book.isBorrowed = true;
    await this.bookRepository.updateById(id, book);

    await this.borrowRecordRepository.create({
      bookId: id,
      borrower: requestData.borrower,
      borrowDate: new Date(),
    });
  }

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

    book.isBorrowed = false;
    await this.bookRepository.updateById(id, book);

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
