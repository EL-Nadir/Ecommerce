import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { FormsModule } from '@angular/forms';
import { ContactComponent } from './components/contact/contact.component';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { OrderComponent } from './components/order/order.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TimelineModule } from 'primeng/timeline';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminComponent } from './components/admin/admin.component';
import { MessagesComponent } from './components/admin/messages/messages.component';
import { OrdersComponent } from './components/admin/orders/orders.component';
import { UsersComponent } from './components/admin/users/users.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { ProductsManagementComponent } from './components/admin/products-management/products-management.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProductComponent,
    ProductsComponent,
    ShoppingCartComponent,
    ContactComponent,
    OrderComponent,
    PageNotFoundComponent,
    AdminComponent,
    MessagesComponent,
    OrdersComponent,
    UsersComponent,
    ProductsManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
    RouterOutlet, 
    RouterLink, 
    NgForOf,
    NgOptimizedImage,
    NgIf,
    RouterLink,
    FormsModule,
    CarouselModule,
    TagModule,
    ConfirmPopupModule,
    TimelineModule,
    TabMenuModule,
    AccordionModule,
    TableModule,
    ConfirmDialogModule,
    ToolbarModule,
    DialogModule,
    RatingModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
