import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {BorrowRecord, BorrowRecordRelations} from '../models';

export class BorrowRecordRepository extends DefaultCrudRepository<
  BorrowRecord,
  typeof BorrowRecord.prototype.id,
  BorrowRecordRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(BorrowRecord, dataSource);
  }
}
