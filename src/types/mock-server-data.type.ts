export type MockServerData = {
  titles: string[];
  descriptions: string[];
  cities: { name: string; location: { latitude: number; longitude: number } }[];
  previewImages: string[];
  housingImages: string[];
  housingTypes: string[];
  goods: string[];
  users: { name: string; email: string; avatarUrl: string; type: string }[];
};
