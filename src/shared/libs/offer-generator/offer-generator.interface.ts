import { MockServerData } from '../../../types/mock-server-data.type.js';

export interface OfferGenerator {
  generate(mockData: MockServerData): string;
}
