import { Command } from "./command.interface";
import { TSVFileReader } from '../file-reader/tsv-file-reader.js';
import { createOffer } from '../shared/helpers/offer.js';
import chalk from "chalk";

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public execute(filename: string): void {
    if (!filename) {
      console.error(chalk.red('Нужно указать путь к файлу!'));
      return;
    }

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', (line: string) => {
      const offer = createOffer(line);
      console.log(chalk.green('Импортировано предложение:'), offer.title);
      console.dir(offer, { depth: null });
    });

    fileReader.on('end', () => {
      console.log(chalk.bold.cyan('Импорт завершен!'));
    });

    try {
      fileReader.read();
    } catch (err) {
      if (err instanceof Error) {
        console.error(chalk.red(`Не удалось импортировать данные: ${err.message}`));
      }
    }
  }
}
