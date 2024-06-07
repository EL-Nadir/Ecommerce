import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  items: MenuItem[];

  constructor(private router: Router) { 
    this.items = [];
  }

  ngOnInit() {
    this.items = [
      { label: 'Products', icon: 'pi pi-fw pi-shopping-cart', routerLink: 'products' },
      { label: 'Users', icon: 'pi pi-fw pi-users', routerLink: 'users' },
      { label: 'Orders', icon: 'pi pi-fw  pi-box', routerLink: 'orders' },
      { label: 'Messages', icon: 'pi pi-fw pi-envelope', routerLink: 'messages' }
    ];
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
