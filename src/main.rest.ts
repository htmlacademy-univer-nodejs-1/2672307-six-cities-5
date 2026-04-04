import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication } from './rest/rest.application.js';
import { Logger } from './shared/libs/logger/logger.interface.js';
import { PinoLogger } from './shared/libs/logger/pino.logger.js';
import { Config } from './shared/libs/config/config.interface.js';
import { RestConfig } from './shared/libs/config/rest.config.js';
import { RestSchema } from './shared/libs/config/rest.schema.js';
import { Component } from './shared/types/component.enum.js';
import { DatabaseClient } from './shared/libs/database-client/database-client.interface.js';
import { MongoDatabaseClient } from './shared/libs/database-client/mongo.database-client.js';
import { UserModel } from './shared/modules/user/user.entity.js';
import { DefaultUserService } from './shared/modules/user/default-user.service.js';
import { UserService } from './shared/modules/user/user-service.interface.js';
import { OfferModel } from './shared/modules/offer/offer.entity.js';
import { DefaultOfferService } from './shared/modules/offer/default-offer.service.js';
import { OfferService } from './shared/modules/offer/offer-service.interface.js';
import { Controller } from './shared/libs/rest/controller/controller.interface.js';
import OfferController from './shared/modules/offer/offer.controller.js';

async function bootstrap() {
  const container = new Container();

  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  container.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  container.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  container.bind(Component.UserModel).toConstantValue(UserModel);
  container.bind<OfferService>(Component.OfferService).to(DefaultOfferService).inSingletonScope();
  container.bind(Component.OfferModel).toConstantValue(OfferModel);
  container.bind<Controller>(Component.OfferController).to(OfferController).inSingletonScope();

  const app = container.get<RestApplication>(Component.RestApplication);
  await app.init();
}

bootstrap();
