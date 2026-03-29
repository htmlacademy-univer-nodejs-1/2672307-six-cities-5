import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Command } from './command.interface.js';
import chalk from 'chalk';

export class VersionCommand implements Command {
  public getName(): string {
    return '--version';
  }

  public execute(): void {
    const content = readFileSync(resolve('./package.json'), 'utf-8');
    const { version } = JSON.parse(content);
    console.info(chalk.cyan(version));
  }
}
