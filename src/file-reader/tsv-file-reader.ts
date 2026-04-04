import { EventEmitter } from 'node:events';
import { createReadStream } from 'node:fs';
import { createInterface, Interface } from 'node:readline';

export class TSVFileReader extends EventEmitter {
  private lineReader: Interface | null = null; // Храним ссылку на интерфейс чтения

  constructor(public filename: string) {
    super();
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: 16384,
      encoding: 'utf-8',
    });

    // Создаем интерфейс для построчного чтения
    this.lineReader = createInterface({
      input: readStream,
      terminal: false,
    });

    let importedRowCount = 0;

    // Подписываемся на событие каждой строки
    this.lineReader.on('line', (line) => {
      if (line.trim().length > 0) {
        importedRowCount++;
        this.emit('line', line);
      }
    });

    // Подписываемся на завершение файла
    this.lineReader.on('close', () => {
      this.emit('end', importedRowCount);
    });

    // Ждем завершения стрима (через промис, чтобы await в execute работал корректно)
    await new Promise((resolve) => {
      this.lineReader?.on('close', resolve);
    });
  }

  // Метод для остановки чтения (вызывается из ImportCommand)
  public pause() {
    this.lineReader?.pause();
  }

  // Метод для возобновления чтения (вызывается из ImportCommand)
  public resume() {
    this.lineReader?.resume();
  }
}
