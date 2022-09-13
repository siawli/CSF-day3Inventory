import { Component } from '@angular/core';
import { Order, OrderDB } from './models';
import * as uuid from "uuid";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'day3Inventory';

  ordersDB: OrderDB = {}
  orderToUpdate!: Order

  newOrder(order: Order) {
    if (order.orderId == undefined) {
      order.orderId = uuid.v4().substring(0, 8);
    }
    this.ordersDB = {... this.ordersDB, [order.orderId]: order}
  }

  updateInventory(key: string) {
    this.orderToUpdate = this.ordersDB[key];
  }
}
