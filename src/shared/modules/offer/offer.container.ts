import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { OfferService } from './offer-service.interface.js';
import DefaultOfferService from './default-offer.service.js';
import { OfferEntity, OfferModel } from './offer.entity.js';
import { Component } from '../../types/component.enum.js';
import { Controller } from '../../libs/rest/controller/controller.interface.js';
import OfferController from './offer.controller.js';

export function createOfferContainer(offerContainer: Container) {
  offerContainer.bind<OfferService>(Component.OfferService).to(DefaultOfferService).inSingletonScope();
  offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  offerContainer.bind<Controller>(Component.OfferController).to(OfferController).inSingletonScope();
}
