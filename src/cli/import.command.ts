import { Command } from './command.interface.js';
import { createOffer } from '../shared/helpers/offer.js'; // Проверь пути
import { TSVFileReader } from '../file-reader/tsv-file-reader.js';
import { UserService } from '../shared/modules/user/user-service.interface.js';
import { OfferService } from '../shared/modules/offer/offer-service.interface.js';
import mongoose from 'mongoose';
import { getMongoURI } from '../shared/helpers/database.js';

export class ImportCommand implements Command {
  constructor(
    private readonly userService: UserService,
    private readonly offerService: OfferService,
    private readonly salt: string, // Соль для паролей из .env
  ) { }

  public getName(): string {
    return '--import';
  }

  private async saveOffer(line: string) {
    const offer = createOffer(line);

    const user = await this.userService.findOrCreate({
      name: offer.author.name,
      email: offer.author.email,
      avatarUrl: offer.author.avatarUrl,
      password: 'default-password',
      type: offer.author.type,
    }, this.salt);

    // Собираем DTO из распарсенного оффера
    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      postDate: offer.postDate,
      city: offer.city,
      previewImage: offer.previewImage,
      images: offer.images,
      isPremium: offer.isPremium,
      isFavourite: offer.isFavourite,
      rating: offer.rating,
      type: offer.type,
      rooms: offer.rooms,
      guests: offer.guests,
      price: offer.price,
      goods: offer.goods,
      userId: user.id,
      // Раскладываем объект coordinates на плоские поля для базы
      latitude: offer.coordinates.latitude,
      longitude: offer.coordinates.longitude,
    });
  }

  public async execute(filename: string, dbUser: string, dbPass: string, dbHost: string, dbName: string): Promise<void> {
    const uri = getMongoURI(dbUser, dbPass, dbHost, 27017, dbName);

    await mongoose.connect(uri);
    console.log(`Успешно подключились к базе данных: ${uri}`);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', async (line) => {
      fileReader.pause();
      try {
        await this.saveOffer(line);
      } catch (err) {
        console.error(`Ошибка импорта: ${err}`);
      }
      fileReader.resume();
    });

    fileReader.on('end', async (count: number) => {
      console.log(`\n✔ База наполнена! Обработано строк: ${count}`);

      await mongoose.disconnect();
      console.log('Отключились от базы данных.');
    });

    await fileReader.read();
  }
}
