import { IUser } from './user';

export interface IOrder {
  id?: number;
  userId?: number;
  description: string;
  quantity: number;
  value: number;

  user?: IUser;
}
