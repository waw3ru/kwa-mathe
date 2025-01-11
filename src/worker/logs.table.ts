import { LogRecord, LogsTableOp } from '../utils.worker';

export class LogsTable implements LogsTableOp {
  log(data: LogRecord): void {
    throw new Error('Method not implemented.');
  }

  query(start: number, end: number): LogRecord[] {
    throw new Error('Method not implemented.');
  }

  getAll(): LogRecord[] {
    throw new Error('Method not implemented.');
  }
}
