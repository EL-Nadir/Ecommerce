import { ProductService } from './../../services/product.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import {User} from'src/app/interfaces/auth';
import { Product } from 'src/app/model/product';
//import { productService } from './../../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'ElectroStore';
  products: Product[] = [];
  computerProducts: Product[] = [];
  

  actions : Array<any> = [
    {title: "Home", "route": "/home"},
    {title : "Catalog", "route" : "/products"},
    {title: "Cart", "route": "/cart"},
    {title: "Contact", "route": "/contact"},
    
  ];
  currentUser: User | null = null; 
  currentAction : any;
  public filteredProducts: Array<Product> = [];
  public currentFilter: string = '';
  
  setCurrentAction(action: any) {
    this.currentAction = action;
  }
  
  constructor(
    private router: Router, 
    private authService: AuthService,
    private msgService: MessageService,
    private productService: ProductService
  ) { }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  filterProducts() {
    if (this.currentFilter) {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.currentFilter.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products;
    }
  }

  ngOnInit(): void {
    
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.computerProducts = this.products.filter(product => product.name === 'Computer');
    });
    
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

  navigateToProductDetail(productId: string): void {
    this.router.navigate(['/product', productId]);
  }

  getStarRating(review: number): string {
    return '★'.repeat(review);
  }
}
