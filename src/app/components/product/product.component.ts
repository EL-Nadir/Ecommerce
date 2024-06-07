import {Component, OnInit} from '@angular/core';
import {Product} from "../../model/product";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router} from '@angular/router';
import {ShoppingCartItem} from "../../model/shoppingCartItem";
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import {User} from'src/app/interfaces/auth';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  productId: number = 0;
  product : Product = new Product();
  item : ShoppingCartItem = new ShoppingCartItem();
  quantity : number = 0;
  currentUser: User | null = null; // Add currentUser property
  
  constructor(
    private route: ActivatedRoute,
    private productService : ProductService,private router: Router,
    private authService: AuthService,
    private msgService: MessageService
  ) {
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.getProduct(this.productId);
    });

    const email = sessionStorage.getItem('email');
    if (email) {
      this.authService.getUserByEmail(email).subscribe(
        response => {
          if (response.length > 0) {
            const { id, fullName, email, address, password } = response[0];
            this.currentUser = { id, fullName, email, address, password };
            const user = response[0];
            this.productService.currentUser = user;
          }
          
        },
        error => {
          this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
        }
      );
    }

  }


  private getProduct(productId: number) {
    this.productService.getProduct(productId).subscribe(
      product => {
        this.product = product;
        console.log('get product : '+this.product.name);
      }
    )
  }


  add() {
    this.quantity += 1;
  }

  remove() {
    if(this.quantity > 0)
      this.quantity -= 1;
  }

  buy() {
    console.log('component : click add to cart .....');
    console.log("name  : "+this.product.name);
    this.item._product = this.product;
    this.item._quantity = this.quantity;
    this.productService.addToCart(this.item);
    this.quantity;
    this.navigateToCart();
    this.productService.saveCart();
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }
  getStarRating(review: number): string {
    return '★'.repeat(review);
  }

  actions : Array<any> = [
    {title: "Home", "route": "/home"},
    {title : "Catalog", "route" : "/products"},
    {title: "Cart", "route": "/cart"},
    {title: "Contact", "route": "/contact"},
    
  ];
  
  currentAction : any;
  setCurrentAction(action: any) {
    this.currentAction = action;
  }
  

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
