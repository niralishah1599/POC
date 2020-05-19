import { Component, OnInit } from '@angular/core';
//service
import { OrderService } from "src/app/services/order.service";
//interface
import { Iorder } from 'src/app/models/order';
import { IadvanceSearch } from 'src/app/models/advanceSearch';
//validator
import { Validators, FormBuilder } from '@angular/forms';
//filter
import { AdvanceSearchPipe } from 'src/app/core/pipes/advance-search.pipe';
//modal
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.scss']
})
export class AdvanceSearchComponent implements OnInit {

  orders: Iorder[] = [];
  customerName: Iorder[] = [];
  shipper: Iorder[] = [];
  filteredOrders: Iorder[] = [];
  searchObj: Iorder;
  selectedShipper: [];
  selectedFields: IadvanceSearch;
 
  constructor(private _orderService: OrderService, private fb: FormBuilder, private advanceSearchPipe: AdvanceSearchPipe, private activeModal: NgbActiveModal) { }

  advanceSearchForm = this.fb.group({
    selectedShippers: [, [Validators.required]],
    selectedCustomerNames: [, [Validators.required]],
    selectedFromDate: [, [Validators.required]],
    selectedToDate: [, [Validators.required]],
    selectedFromAmount: [, [Validators.required,Validators.min(1)]],
    selectedToAmount: [, [Validators.required,,Validators.min(1)]],
  })
  ngOnInit() {
    this._orderService.getAllData().subscribe(data => {
      this.orders = data;
      this.filteredOrders = data;
      this.customerName = this._orderService.getCustomerNameOrShipper(data.map(data => data['customerName']));
      this.shipper = this._orderService.getCustomerNameOrShipper(data.map(data => data['shipper']));
    })
  }

  //toGetSelectedShipperData
  get selectedShippers() {
    return this.advanceSearchForm.get('selectedShippers')
  }

  //toGetSelectedCustomerData
  get selectedCustomerNames() {
    return this.advanceSearchForm.get('selectedCustomerNames')
  }

  //ToSubmitFilteredData
  onSubmit() {
    this.orders = this.advanceSearchPipe.transform(this.filteredOrders, this.advanceSearchForm.value);
    this.activeModal.close();
    this._orderService.filterdData(this.orders);
  }

}
