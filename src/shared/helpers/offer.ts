import { CityName, HousingType, Offer } from "../../types/offer.type";
import { UserType } from "../../types/user.type";

export function createOffer(row: string): Offer {
  const tokens = row.replace('\n', '').split('\t');

  const [
    title, description, postDate, city, previewImage,
    images, isPremium, isFavorite, rating, type,
    rooms, guests, price, goods, author, coordinates
  ] = tokens;

  const [name, email, avatarUrl, userType] = author.split(';');
  const [latitude, longitude] = coordinates.split(';');

  return {
    title,
    description,
    postDate: new Date(postDate),
    city: city as CityName,
    previewImage,
    images: images.split(';'),
    isPremium: isPremium === 'true',
    isFavourite: isFavorite === 'true',
    rating: Number.parseFloat(rating),
    type: type as HousingType,
    rooms: Number.parseInt(rooms, 10),
    guests: Number.parseInt(guests, 10),
    price: Number.parseInt(price, 10),
    goods: goods.split(';'),
    author: { name, email, avatarUrl, type: userType as UserType },
    coordinates: {
      latitude: Number.parseFloat(latitude),
      longitude: Number.parseFloat(longitude),
    },
  }
}
