import { Component, OnInit ,ViewChild, Output, EventEmitter} from '@angular/core';
import {OrderServiceService} from "src/app/services/order-service.service";
import { Iorder } from 'src/app/models/order';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Validators,FormBuilder} from '@angular/forms';
import {searchFilter} from 'src/app/pipes/searchFilter.pipe';
import {IadvanceSearch} from 'src/app/models/advanceSearch';

@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.scss']
})
export class AdvanceSearchComponent implements OnInit {
  orders:Iorder[]=[];
  customerName:Iorder[]=[];
  shipper:Iorder[]=[];
  model: NgbDateStruct;
  filteredOrders:Iorder[]=[];
  searchObj:Iorder;
  selectedShipper:[];
  selectedFields:IadvanceSearch;
  
  constructor(private _orderService:OrderServiceService,private fb:FormBuilder,private _searchFilter:searchFilter) { }
  
  advanceSearchForm = this.fb.group({
    selectedShippers: [,[Validators.required]],
    selectedCustomerNames:[,[Validators.required]],
    selectedFromDate:[,[Validators.required]],
    selectedToDate:[,[Validators.required]],
    selectedFromAmount:[,[Validators.required]],
    selectedToAmount:[,[Validators.required]],
    })
  ngOnInit() {
  this._orderService.getAllData().subscribe(data => {
  this.orders=data;
  
  this.filteredOrders=data;
  this.customerName = this._orderService.getCustomerNameOrShipper(data.map(data => data['customerName']));
  this.shipper = this._orderService.getCustomerNameOrShipper(data.map(data => data['shipper']));
  
  })
  }
  
  get selectedShippers()
{
return this.advanceSearchForm.get('selectedShippers')
}

get selectedCustomerNames()
{
return this.advanceSearchForm.get('selectedCustomerNames')
}
  
  onSubmit()
  {
  console.log(this.advanceSearchForm.value);
  

  //this.orders=this._searchFilter.transform(this.filteredOrders,this.advanceSearchForm.controls['fromOrderDate'].value,this.advanceSearchForm.controls['toOrderDate'].value,this.advanceSearchForm.controls['fromOrderTotal'].value,this.advanceSearchForm.controls['toOrderTotal'].value,this.selectedShipper);
  this.orders=this._searchFilter.transform(this.filteredOrders,this.advanceSearchForm.value);
  console.log("order",this.orders);
  this._orderService.filterdData(this.orders);
  }
   
}
