import { Command } from "./command.interface";
import chalk from "chalk";

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public execute(): void {
    console.info(chalk.cyan(
      `
      Программа для подготовки данных для REST API сервера.
      Пример: cli.js --<command> [--arguments]
      Команды:
          --version:                   ${chalk.grey('# выводит номер версии')}
          --help:                      ${chalk.grey('# печатает этот текст')}
          --import <path>:             ${chalk.grey('# импортирует данные из TSV')}
      `
    ));
  }
}
