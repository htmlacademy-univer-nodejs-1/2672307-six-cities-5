import { EventEmitter } from 'node:events';
import { createReadStream } from 'node:fs';

export class TSVFileReader extends EventEmitter {
  constructor(public filename: string) {
    super();
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: 16384, // Читаем кусками по 16KB
      encoding: 'utf-8',
    });

    let remainingData = '';
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();
      let nextLinePosition = remainingData.indexOf('\n');

      while (nextLinePosition >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition);
        remainingData = remainingData.slice(nextLinePosition + 1);

        if (completeRow.trim().length > 0) {
          importedRowCount++;
          this.emit('line', completeRow);
        }

        nextLinePosition = remainingData.indexOf('\n');
      }
    }

    // Отдаем последний кусочек, если файл не закончился переносом строки
    if (remainingData.trim().length > 0) {
      importedRowCount++;
      this.emit('line', remainingData);
    }

    this.emit('end', importedRowCount);
  }
}
