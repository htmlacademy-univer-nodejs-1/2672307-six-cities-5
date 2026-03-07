export enum UserType{
  Standard = 'обычный',
  Pro = 'pro'
}

export type User = {
  name: string;
  email: string;
  avatarUrl?: string;
  type: UserType;
}
