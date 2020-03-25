import { Component, OnInit } from '@angular/core';
import {OrderServiceService} from "src/app/services/order-service.service";
import { Iorder } from 'src/app/models/order';
@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.scss']
})
export class AdvanceSearchComponent implements OnInit {

  orders:Iorder[]=[];
  customerName:Iorder[]=[];
  shipper:Iorder[]=[];
  constructor(private _orderService:OrderServiceService) { }

  ngOnInit() {
    this._orderService.getAllData().subscribe(data => {
    
      this.customerName = this._orderService.getCustomerNameOrShipper(data.map(data => data['customerName']));
      this.shipper = this._orderService.getCustomerNameOrShipper(data.map(data => data['shipper']));
  
    })
  
  }

}
