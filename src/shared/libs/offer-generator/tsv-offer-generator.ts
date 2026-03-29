import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../../types/mock-server-data.type.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/common.js';

export class TSVOfferGenerator implements OfferGenerator {
  public generate(mockData: MockServerData): string {
    const title = getRandomItem(mockData.titles);
    const description = getRandomItem(mockData.descriptions);
    const postDate = new Date().toISOString();
    const city = getRandomItem(mockData.cities);
    const previewImage = getRandomItem(mockData.previewImages);
    const housingImages = getRandomItems(mockData.housingImages, 6).join(';');
    const isPremium = Math.random() > 0.5;
    const isFavourite = Math.random() > 0.5;
    const rating = generateRandomValue(1, 5, 1);
    const type = getRandomItem(mockData.housingTypes);
    const rooms = generateRandomValue(1, 8);
    const guests = generateRandomValue(1, 10);
    const price = generateRandomValue(100, 100000);
    const goods = getRandomItems(mockData.goods, generateRandomValue(1, 5)).join(';');
    const user = getRandomItem(mockData.users);
    const author = `${user.name};${user.email};${user.avatarUrl};${user.type}`;
    const coordinates = `${city.location.latitude};${city.location.longitude}`;

    return [
      title, description, postDate, city.name, previewImage, housingImages,
      isPremium, isFavourite, rating, type, rooms, guests, price, goods, author, coordinates
    ].join('\t');
  }
}
