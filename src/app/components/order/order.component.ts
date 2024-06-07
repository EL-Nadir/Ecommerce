// order.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../../model/order';  

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  events: any[] = [];

  orderEvents: any[] = [];
  stageEvents: string[] = ["Ordered", "Processing", "Shipped", "Delivered"];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    this.http.get<Order[]>('http://localhost:3000/orders').subscribe(data => {
      this.events = data.map(order => ({
        status: `Order #${order.id}`,
        date: new Date(order.date).toLocaleString(),
        icon: 'pi pi-shopping-bag',
        color: '#0d6efd',
        image: order.items[0]?.product.image,
        name: order.items[0]?.product.name,
        title: order.items[0]?.product.title,
        description: order.items[0]?.product.description,
        quantity: order.items[0]?.quantity,
        total: order.total
      }));
    });
  }
}
