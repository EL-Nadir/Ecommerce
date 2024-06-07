import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from "../../model/product";
import { ProductService } from "../../services/product.service";
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import {User} from'src/app/interfaces/auth';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: Array<Product> = [];
  public filteredProducts: Array<Product> = [];
  public currentFilter: string = '';
  currentUser: User | null = null; // Add currentUser property
  
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private msgService: MessageService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.currentFilter = params['filter'] || '';
      this.getProducts();
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

    this.productService.getProducts().subscribe((data: any) => {
      this.products = data.products;
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: data => {
        this.products = data;
        this.filterProducts();
      },
      error: err => {
        console.log(err);
      }
    });
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

  navigateToProductDetail(productId: string): void {
    this.router.navigate(['/product', productId]);
  }

  getStarRating(review: number): string {
    return '★'.repeat(review);
  }

  actions: Array<any> = [
    { title: "Home", "route": "/home" },
    { title: "Catalog", "route": "/products" },
    { title: "Cart", "route": "/cart" },
    {title: "Contact", "route": "/contact"},
  ];

  currentAction: any;
  setCurrentAction(action: any) {
    this.currentAction = action;
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

}
