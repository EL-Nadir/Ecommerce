import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../model/product';

@Component({
  selector: 'app-products-management',
  templateUrl: './products-management.component.html',
  styleUrls: ['./products-management.component.css']
})
export class ProductsManagementComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product = new Product();
  productDialog: boolean = false;
  newProduct: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products.map(p => {
        const product = new Product();
        product.id = p.id;
        product.name = p.name;
        product.title = p.title;
        product.price = p.price;
        product.description = p.description;
        product.image = p.image;
        product.review = p.review;
        return product;
      });
    });
  }

  openNew(): void {
    this.selectedProduct = new Product();
    this.productDialog = true;
    this.newProduct = true;
  }

  editProduct(product: Product): void {
    this.selectedProduct = new Product(); // Create a new instance
    this.selectedProduct.id = product.id;
    this.selectedProduct.name = product.name;
    this.selectedProduct.title = product.title;
    this.selectedProduct.price = product.price;
    this.selectedProduct.description = product.description;
    this.selectedProduct.image = product.image;
    this.selectedProduct.review = product.review;
    
    this.productDialog = true;
    this.newProduct = false;
}

  deleteProduct(product: Product): void {
    this.productService.deleteProductManagement(product.id).subscribe(() => {
      this.loadProducts();
    });
  }

  saveProduct(): void {
    if (this.newProduct) {
      this.productService.addProduct(this.selectedProduct).subscribe(() => {
        this.loadProducts();
        this.productDialog = false;
      });
    } else {
      this.productService.updateProduct(this.selectedProduct.id, this.selectedProduct).subscribe(() => {
        this.loadProducts();
        this.productDialog = false;
      });
    }
  }

  hideDialog(): void {
    this.productDialog = false;
  }
}
