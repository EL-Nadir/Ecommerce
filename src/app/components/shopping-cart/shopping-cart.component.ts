import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ShoppingCart } from '../../model/shoppingCart';
import { ShoppingCartItem } from '../../model/shoppingCartItem';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import {User} from 'src/app/interfaces/auth';
import { Order } from '../../model/order';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  cart: ShoppingCart;
  currentUser: User | null = null; 
  isOrderPlaced: boolean = false;
 
  constructor(
    private productService: ProductService, 
    private router: Router,
    private authService: AuthService,
    private msgService: MessageService
  ) {
    const user: User = {
      id: '', // Initialize with appropriate values or retrieve from auth service
      fullName: '',
      email: '',
      address: '',
      password: ''
    };
    this.cart = new ShoppingCart('1', 0, user);}

  ngOnInit() {
   
    this.cart = this.productService.cart;
    

    const email = sessionStorage.getItem('email');
    if (email) {
      this.authService.getUserByEmail(email).subscribe(
        response => {
          if (response.length > 0) {
            const { id, fullName, email, address, password } = response[0];
            this.currentUser = { id, fullName, email, address, password };
          }
          
        },
        error => {
          this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
        }
      );
    }

  }

  priceOfAll() {
    let number = 0;
    for (let item of this.cart._items) {
      number = number + item._quantity * item._product.price;
    }
    return number;
  }
  
  deleteProduct(item: ShoppingCartItem) {
    this.productService.deleteProduct(item);
  }
  createOrder() {
    if (this.currentUser) {
      const order = new Order(
        Date.now().toString(),
        new Date().toISOString(),
        this.currentUser,
        this.cart._items,
        this.priceOfAll()
      );

      this.productService.createOrder(order).subscribe(
        () => {
          this.productService.clearCart(this.cart.id).subscribe(
            () => {
              this.cart._items = [];
              this.msgService.add({ severity: 'success', summary: 'Congratulations!', detail: 'Your order has been placed successfully.' });
            },
            error => {
              this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Failed to clear cart.' });
            }
          );
        },
        error => {
          this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Failed to place order.' });
        }
      );
    }
  }

  Checkout() {
    this.createOrder();
  }

  Order() {
    this.createOrder();
  }

  toggleOrderPlaced(status: boolean) {
    this.isOrderPlaced = status;
  }
  
  actions : Array<any> = [
    {title: "Home", "route": "/home"},
    {title : "Catalog", "route" : "/products"},
    {title: "Cart", "route": "/cart"},
    {title: "Contact", "route": "/contact"},
    
  ];

  navigateToOrder(): void {
    this.router.navigate(['/order']);
  }
  
  currentAction : any;
  setCurrentAction(action: any) {
    this.currentAction = action;
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  
}