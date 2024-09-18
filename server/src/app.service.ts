import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { readLastLinesEnc } from 'read-last-lines-ts';

@Injectable()
export class AppService {
  getLogs(rowsCount = 10): string[] {
    const current = process.cwd();
    const result = readLastLinesEnc('utf8')(
      path.resolve(current, '../server/src/mock.log'),
      rowsCount,
    );
    return result.split('\n');
  }

  setLog(value: string): void {
    const current = process.cwd();
    try {
      fs.appendFileSync(
        path.resolve(current, '../server/src/mock.log'),
        `\n${value}`,
      );
    } catch (err) {
      console.error(err);
    }
  }
}
