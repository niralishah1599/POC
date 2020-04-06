import { Component, OnInit, Input } from '@angular/core';
//validators
import { Validators, FormBuilder } from '@angular/forms';
//firedatabase
import { AngularFireDatabase } from 'angularfire2/database';
//interface
import { Iorder } from "src/app/models/order";
//service
import { OrderService } from "src/app/services/order.service";
//modal
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-edit-order',
  templateUrl: './add-edit-order.component.html',
  styleUrls: ['./add-edit-order.component.scss']
})
export class AddEditOrderComponent implements OnInit {

  data: Iorder;
  orderLength: number;
  @Input() public editOrder: Iorder;

  constructor(private _orderService: OrderService, private activeModal: NgbActiveModal, private fb: FormBuilder, private angularFireDatabase: AngularFireDatabase) { }

  orderForm = this.fb.group({
    customerName: ["", Validators.required],
    address: ["", Validators.required],
    city: ["", Validators.required],
    shipper: ["", Validators.required],
    orderDate: ["", Validators.required],
    orderTotal: ["",[Validators.required,Validators.min(1)]]
  })

  ngOnInit() {
    this.getOrders();

    if (this.editOrder) {
        this.orderForm.patchValue({
        id: this.editOrder.id,
        customerName: this.editOrder.customerName,
        address: this.editOrder.address,
        city: this.editOrder.city,
        shipper: this.editOrder.shipper,
        orderDate: this.editOrder.orderDate,
        orderTotal: this.editOrder.orderTotal
      })
   }
 }
 
  //toGetOrderData
  getOrders() {
        this._orderService.getAllData().subscribe(data => {
          this.orderLength = data.length;
    })
}

  //SubmitOrderData
  onSubmit() {
    if (this.editOrder) {
      let data = {
        id: this.editOrder.id,
        customerName: this.orderForm.controls['customerName'].value,
        address: this.orderForm.controls['address'].value,
        city: this.orderForm.controls['city'].value,
        shipper: this.orderForm.controls['shipper'].value,
        orderDate: this.orderForm.controls['orderDate'].value,
        orderTotal: this.orderForm.controls['orderTotal'].value,
      }
      this.activeModal.close();
      this._orderService.updateOrder(data);
    }

    else {
      let sub = this.angularFireDatabase.list('/orders').valueChanges().subscribe(orders => {
        this.data =
        {
          id: orders.length + 1,
          customerName: this.orderForm.controls['customerName'].value,
          address: this.orderForm.controls['address'].value,
          city: this.orderForm.controls['city'].value,
          shipper: this.orderForm.controls['shipper'].value,
          orderDate: this.orderForm.controls['orderDate'].value,
          orderTotal: this.orderForm.controls['orderTotal'].value,
        }

        this._orderService.addOrder(this.data);
        sub.unsubscribe();
        this.activeModal.close();
      });
    }
  }
}
