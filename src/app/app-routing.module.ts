import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { ProductComponent } from './components/product/product.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductsComponent } from './components/products/products.component';
import { ContactComponent } from './components/contact/contact.component';
import { OrderComponent } from './components/order/order.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component'
import { AdminComponent } from './components/admin/admin.component';
import { UsersComponent } from './components/admin/users/users.component';
import { OrdersComponent } from './components/admin/orders/orders.component';
import { MessagesComponent } from './components/admin/messages/messages.component';
import { ProductsManagementComponent } from './components/admin/products-management/products-management.component';


const routes: Routes = [
  {path: 'login',component: LoginComponent, title: 'Login'},
  {path: 'register',component: RegisterComponent, title: 'Register'},
  {path : "products", component : ProductsComponent, title: 'Catalog'},
  {path : "cart" , component : ShoppingCartComponent, title: 'My Cart'},
  {path: 'home',component: HomeComponent,canActivate: [authGuard], title: 'Home'},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path : "product/:id" , component : ProductComponent, title: 'Product'},
  {path: "contact", component : ContactComponent, title: 'Contact'},
  {path: "order", component : OrderComponent, title: 'Order'},
  {path: "admin", component : AdminComponent, title: 'Admin',  children: [
    { path: 'products', component: ProductsManagementComponent },
    { path: 'users', component: UsersComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'messages', component: MessagesComponent }
  ]},
  {'path': '', redirectTo: '/home', pathMatch: 'full'},
  {'path': '**', component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
