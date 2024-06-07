import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/model/order';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private msgService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe((data) => {
      this.orders = data;
    });
  }

  confirmOrder(orderId: string): void {
    this.orderService.deleteOrder(orderId).subscribe(() => {
      this.msgService.add({ severity: 'success', summary: 'Done!', detail: 'Order confirmed and deleted.' });
      this.orders = this.orders.filter(order => order.id !== orderId);
    });
  }
}
