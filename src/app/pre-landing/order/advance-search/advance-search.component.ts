import { Component, OnInit } from '@angular/core';
//service
import { OrderServiceService } from "src/app/services/order-service.service";
//interface
import { Iorder } from 'src/app/models/order';
import { IadvanceSearch } from 'src/app/models/advanceSearch';
//validator
import { Validators, FormBuilder } from '@angular/forms';
//filter
import { searchFilter } from 'src/app/pipes/searchFilter.pipe';
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

  constructor(private _orderService: OrderServiceService, private fb: FormBuilder, private _searchFilter: searchFilter, private activeModal: NgbActiveModal) { }

  advanceSearchForm = this.fb.group({
    selectedShippers: [, [Validators.required]],
    selectedCustomerNames: [, [Validators.required]],
    selectedFromDate: [, [Validators.required]],
    selectedToDate: [, [Validators.required]],
    selectedFromAmount: [, [Validators.required]],
    selectedToAmount: [, [Validators.required]],
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
   // console.log(this.advanceSearchForm.value);
    this.orders = this._searchFilter.transform(this.filteredOrders, this.advanceSearchForm.value);
    //console.log("order", this.orders);
    this.activeModal.close();
    this._orderService.filterdData(this.orders);
  }

}
