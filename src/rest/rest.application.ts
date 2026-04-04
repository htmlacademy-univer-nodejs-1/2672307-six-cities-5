import { injectable, inject } from 'inversify';
import express, { Express } from 'express';
import { Logger } from '../shared/libs/logger/logger.interface.js';
import { Config } from '../shared/libs/config/config.interface.js';
import { RestSchema } from '../shared/libs/config/rest.schema.js';
import { Component } from '../shared/types/component.enum.js';
import { DatabaseClient } from '../shared/libs/database-client/database-client.interface.js';
import { getMongoURI } from '../shared/helpers/database.js';
import { Controller } from '../shared/libs/rest/controller/controller.interface.js';

@injectable()
export class RestApplication {
  private readonly server: Express;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
    @inject(Component.OfferController) private readonly offerController: Controller,
  ) {
    this.server = express();
  }

  private async initMiddleware() {
    this.logger.info('Initializing middleware...');
    this.server.use(express.json());
  }

  private async initRoutes() {
    this.logger.info('Initializing routes...');
    this.server.use('/offers', this.offerController.router);
  }

  public async init() {
    this.logger.info('Application initialization...');

    const mongoUri = getMongoURI(
      String(this.config.get('MONGO_INITDB_ROOT_USERNAME')),
      String(this.config.get('MONGO_INITDB_ROOT_PASSWORD')),
      String(this.config.get('DB_IP')),
      27017,
      String(this.config.get('DB_NAME')),
    );

    try {
      this.logger.info('Connecting to database...');
      await this.databaseClient.connect(mongoUri);
      this.logger.info('Database connection established.');
    } catch (error) {
      this.logger.error('Failed to connect to the database.');
      this.logger.error(error instanceof Error ? error.message : String(error));
      process.exit(1);
    }

    await this.initMiddleware();
    await this.initRoutes();

    const port = this.config.get('PORT');
    this.server.listen(port, () => {
      this.logger.info(`🚀 Server started on http://localhost:${port}`);
    });
  }
}
