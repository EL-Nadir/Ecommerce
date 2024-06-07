// user.ts (model)
import { ShoppingCart } from './shoppingCart';

export class User {
  private _id: string;
  private _fullName: string;
  private _email: string;
  private _password: string;
  //private _userType: string;
  // _shoppingCarts: ShoppingCart[];

  constructor(
    id: string,
    fullName: string,
    email: string,
    password: string,
   // userType: string,
    //shoppingCarts: ShoppingCart[]
  ) {
    this._id = id;
    this._fullName = fullName;
    this._email = email;
    this._password = password;
   //// this._userType = userType;
    //this._shoppingCarts = shoppingCarts;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get fullName(): string {
    return this._fullName;
  }

  set fullName(value: string) {
    this._fullName = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  
}
