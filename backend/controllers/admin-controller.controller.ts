import {Filter, repository} from '@loopback/repository';
import {get, param, response} from '@loopback/rest';
import {BorrowRecord} from '../models';
import {BorrowRecordRepository} from '../repositories';

export class BorrowRecordController {
  constructor(
    @repository(BorrowRecordRepository)
    public borrowRecordRepository: BorrowRecordRepository,
  ) {}

  /** 管理员查看所有借阅记录 */
  @get('/admin/borrow-records')
  @response(200, {
    description: 'Array of BorrowRecord model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            properties: {
              id: {type: 'number'},
              bookId: {type: 'number'},
              borrowerId: {type: 'number'},
              borrowDate: {type: 'string', format: 'date-time'},
              returnDate: {type: 'string', format: 'date-time', nullable: true},
              title: {type: 'string'},
              author: {type: 'string'},
            },
          },
        },
      },
    },
  })
  async getAllBorrowRecords(
    @param.filter(BorrowRecord) filter?: Filter<BorrowRecord>,
  ): Promise<BorrowRecord[]> {
    return this.borrowRecordRepository.find(filter);
  }
}
