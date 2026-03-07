import { EventEmitter } from 'node:events';
import { readFileSync } from 'node:fs';

export class TSVFileReader extends EventEmitter {
  constructor(public filename: string) {
    super();
  }

  public read(): void {
    const content = readFileSync(this.filename, { encoding: 'utf-8' });

    content
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .forEach((line) => {
        this.emit('line', line);
      });

    this.emit('end');
  }
}
