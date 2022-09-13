import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { OrderDB } from '../models';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  orderList!: OrderDB
  
  @Output()
  keyToEdit = new Subject<string>();

  editItems(keyOrder: string) {
    this.keyToEdit.next(keyOrder);
  }

}
