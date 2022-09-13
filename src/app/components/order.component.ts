import { Component, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Subject } from 'rxjs';
import { Item, Order } from '../models';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  form!: FormGroup;
  ordersArr!: FormArray;
  _orderToUpdate!: Order;

  constructor(private fb: FormBuilder) { }


  @Input()
  set orderToUpdate(o: Order) {
    this._orderToUpdate = o;
    this.form = this.createForm(o);
  }
  get getKeyToUpdate(): Order {
    return this._orderToUpdate;
  }

  @Output()
  newOrder = new Subject<Order>();

  ngOnInit(): void {
    this.form = this.createForm();
  }

  processForm() {
    const newOrder: Order = this.form.value as Order;
    if (this._orderToUpdate?.orderId != undefined) {
      newOrder.orderId = this._orderToUpdate.orderId;
    }
    this.newOrder.next(newOrder);
    this.form = this.createForm();
  }

  addItem() {
    this.ordersArr.push(this.createLineItem());
  }
  
  createLineItem(item?: Item): FormGroup {
    return this.fb.group({
      item: this.fb.control<string>(item?.item || '', [Validators.required, Validators.minLength(3)]),
      quantity: this.fb.control<number>(item?.quantity || 1, [Validators.min(1)])
    })
  }

  createLineItems(items: Item[]): FormArray {
    return this.fb.array(items.map(i => this.createLineItem(i)));
  }

  createForm(order?: Order): FormGroup {
    this.ordersArr = this.createLineItems(order?.items || []);
    return this.fb.group({
      name: this.fb.control<string>(order?.name || '', [Validators.required, Validators.minLength(3)]),
      email: this.fb.control<string>(order?.email || '', [Validators.required, Validators.email]),
      items: this.ordersArr
    })
  }

  deleteItem(index: number) {
    this.ordersArr.removeAt(index);
  }
}
