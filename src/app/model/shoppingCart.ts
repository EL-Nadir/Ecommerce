import { ShoppingCartItem } from "./shoppingCartItem";
import { User } from "../interfaces/auth";


export class ShoppingCart {
   id: string = "1";
   total: number = 0;
   user: User;
   date: Date = new Date();
   items: ShoppingCartItem[] ;

constructor(
    id: string,
    total: number = 0,
    user: User,
    date: Date = new Date(),
    items: ShoppingCartItem[] = []
  ) {
    this.id = id;
    this.total = total;
    this.user = user;
    this.date = date;
    this.items = items;
  }

  get _id(): string {
    return this.id;
  }
  set _id(value: string) {
    this.id = value;
  }

  get _total(): number {
    return this.total;
  }
  set _total(value: number) {
    this.total = value;
  }

  get _user(): User {
    return this.user;
  }
  set _user(value: User) {
    this.user = value;
  }

  get _date(): Date {
    return this.date;
  }
  set _date(value: Date) {
    this.date = value;
  }

  get _items(): ShoppingCartItem[] {
    return this.items;
  }
  set _items(items: ShoppingCartItem[]) {
    this.items = items;
  }
}
