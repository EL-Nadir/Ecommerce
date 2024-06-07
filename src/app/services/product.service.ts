import { Injectable } from '@angular/core';
import { ShoppingCart } from '../model/shoppingCart';
import { Product } from '../model/product';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ShoppingCartItem} from "../model/shoppingCartItem";
import {User} from '../interfaces/auth';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  cart : ShoppingCart;
  currentUser: User | null = null;
  private cartUrl = 'http://localhost:3000/carts';
  private orderUrl = 'http://localhost:3000/orders';

  constructor(private http : HttpClient) { 
    const user: User = {
      id: this.currentUser?.id || '',
      fullName: this.currentUser?.fullName || '',
      email: this.currentUser?.email || '',
      address: this.currentUser?.address || '',
      password: this.currentUser?.password || ''
    };
    this.cart = new ShoppingCart('1', 0, user);
  }

  public getProducts():Observable<Array<Product>>{
    return this.http.get<Array<Product>>("http://localhost:3000/products");
  }

  public getProduct(productId:number):Observable<Product>{
    return this.http.get<Product>(`http://localhost:3000/products/${productId}`);
  }

  updateCart(cart: ShoppingCart): Observable<ShoppingCart> {
    return this.http.put<ShoppingCart>(`${this.cartUrl}/1`, cart);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.orderUrl, order);
  }

  clearCart(cartId: string): Observable<void> {
    return this.http.delete<void>(`${this.cartUrl}/${cartId}`);
  }

  addToCart(item: ShoppingCartItem): void {
    this.cart._items.push(item);
  }

  isExisted(item : ShoppingCartItem){
    let elem : ShoppingCartItem | undefined = this.cart._items.find(x => x._product.id == item._product.id);
    if(elem == undefined)
      return false;
    else
      return true;
  }

  deleteProduct(item: ShoppingCartItem) {
    this.cart._items = this.cart._items.filter(i => i.id !== item.id);
    this.updateCart(this.cart).subscribe();
  }

  saveCart(): void {
    this.cart._date = new Date();
    if (this.currentUser) {
      this.cart.user = this.currentUser;
    } else {
      console.error('Error: User is not logged in');
      return;
    }
    this.http.post<ShoppingCart>('http://localhost:3000/carts', this.cart).subscribe({
      next: result => {
        console.log('Cart saved: ', result);
      },
      error: err => console.log('Error saving cart: ', err)
    });
  }

  private baseUrl = 'http://localhost:3000/products';

  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  public updateProduct(productId: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${productId}`, product);
  }

  public deleteProductManagement(productId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${productId}`);
  }

}
