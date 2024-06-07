
export class Product {
  private _id : string = '';
  private _name : string = '';
  private _price : number = 0;
  private _title : string = '';
  private _description : string = '';
  private _image : string = '';
  private _review: number = 0;
 
  constructor() {
  }

  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  get title(): string {
    return this._title;
  }
  set title(value: string) {
    this._title = value;
  }

  get price(): number {
    return this._price;
  }
  set price(value: number) {
    this._price = value;
  }

  get description(): string {
    return this._description;
  }
  set description(value: string) {
    this._description = value;
  }

  get image(): string {
    return this._image;
  }
  set image(value: string) {
    this._image = value;
  }

  get review(): number {
    return this._review;
  }
  set review(value: number) {
    this._review = value;
  }
}
