import { injectable, inject } from 'inversify';
import { Logger } from '../shared/libs/logger/logger.interface.js';
import { Config } from '../shared/libs/config/config.interface.js';
import { RestSchema } from '../shared/libs/config/rest.schema.js';
import { Component } from '../shared/types/component.enum.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) { }

  public async init() {
    this.logger.info('Application initialization...');
    this.logger.info(`Server started on port ${this.config.get('PORT')}`);
  }
}
