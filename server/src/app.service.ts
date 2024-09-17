import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as readLastLines from 'read-last-lines';

@Injectable()
export class AppService {
  async getLogs(rowsCount = 10): Promise<string[]> {
    const current = process.cwd();
    const result = await readLastLines.read(
      path.resolve(current, '../server/src/test.log'),
      rowsCount,
    );
    return result.split('\n');
  }

  setLog(value: string): void {
    const current = process.cwd();
    try {
      fs.appendFileSync(
        path.resolve(current, '../server/src/test.log'),
        `\n${value}`,
      );
    } catch (err) {
      console.error(err);
    }
  }
}
