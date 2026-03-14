#!/usr/bin/env node
import { HelpCommand } from './cli/help.command.js';
import { VersionCommand } from './cli/version.command.js';
import { ImportCommand } from './cli/import.command.js';

class CLIApplication {
  private commands: Record<string, any> = {};
  private defaultCommand = '--help';

  constructor() {
    this.registerCommands();
  }

  private registerCommands() {
    const helpCommand = new HelpCommand();
    const versionCommand = new VersionCommand();
    const importCommand = new ImportCommand();

    this.commands[helpCommand.getName()] = helpCommand;
    this.commands[versionCommand.getName()] = versionCommand;
    this.commands[importCommand.getName()] = importCommand;
  }

  public processCommand(argv: string[]) {
    const [, , commandName, ...parameters] = argv;
    const command = this.commands[commandName] ?? this.commands[this.defaultCommand];
    command.execute(...parameters);
  }
}

const cliApp = new CLIApplication();
cliApp.processCommand(process.argv);
