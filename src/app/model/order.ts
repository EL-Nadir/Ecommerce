import { User } from '../interfaces/auth';
import { ShoppingCartItem } from './shoppingCartItem';

export class Order {
  constructor(
    public id: string,
    public date: string,
    public user: User,
    public items: ShoppingCartItem[],
    public total: number
  ) {}
}