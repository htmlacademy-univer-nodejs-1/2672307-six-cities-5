import { Command } from './command.interface.js';
import chalk from 'chalk';
import { createOffer } from '../shared/helpers/offer.js';
import { TSVFileReader } from '../file-reader/tsv-file-reader.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public async execute(filename: string): Promise<void> {
    if (!filename) {
      console.error(chalk.red('ОШИБКА: Нужно указать путь к файлу!'));
      return;
    }

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', (line: string) => {
      try {
        const offer = createOffer(line);
        console.log(chalk.cyan(`Импортирован оффер: ${offer.title}`));
      } catch (err) {
        console.error(chalk.yellow(`Ошибка парсинга строки: ${err}`));
      }
    });

    fileReader.on('end', (count: number) => {
      console.log(chalk.green(`\n✔ Импорт успешно завершен. Обработано строк: ${count}`));
    });

    fileReader.on('error', (err: Error) => {
      console.error(chalk.red(`Ошибка чтения файла: ${err.message}`));
    });

    try {
      await fileReader.read();
    } catch (err) {
      console.error(chalk.red(`Не удалось прочитать файл: ${err}`));
    }
  }
}
