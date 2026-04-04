import { CityName, HousingType } from '../../../../types/offer.type.js';

export class CreateOfferDto {
  public title!: string;
  public description!: string;
  public postDate!: Date;
  public city!: CityName;
  public previewImage!: string;
  public images!: string[];
  public isPremium!: boolean;
  public isFavourite!: boolean;
  public rating!: number;
  public type!: HousingType;
  public rooms!: number;
  public guests!: number;
  public price!: number;
  public goods!: string[];
  public userId!: string;
  public latitude!: number;
  public longitude!: number;
}
