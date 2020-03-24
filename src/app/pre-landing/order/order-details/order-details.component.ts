import { Component, OnInit ,Input} from '@angular/core';
import {OrderServiceService} from "src/app/services/order-service.service";
import {Iorder}from "src/app/models/order";
import {orderFilter}  from "src/app/pipes/orderFilter.pipe";
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { SideModalComponent } from 'src/app/modals/side-modal/side-modal.component';
import {CenterModalComponent} from "src/app/modals/center-modal/center-modal.component";
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  orders:Iorder[]=[];
  @Input() page = 1;
  @Input() pageSize = 10;
  @Input() collectionSize: number = 100;
  content:string="addOrder";
  searchItem:string;
  filteredOrders:Iorder[] = [];
 
  constructor(private _orderService:OrderServiceService,private _orderFilter:orderFilter,private modalService:NgbModal) { }

  ngOnInit() {
    this.getAllOrderData()
  }

  getAllOrderData()
  {
  this._orderService.getAllData().subscribe(data=>
    {
      console.log(data);
      this.collectionSize = data.length;
      this.filteredOrders=data;
      this.orders=data;
    })
  }

  filterOrder($event){
     this.orders=this._orderFilter.transform(this.filteredOrders, this.searchItem);
    this.collectionSize = this.orders.length
  }


  open(content)
  {
      console.log(content);
      const modalAddRef=this.modalService.open(SideModalComponent);
      modalAddRef.componentInstance.content=content;
  }

  opencenterModal(order:Iorder)
  {
    const modalRef=this.modalService.open(CenterModalComponent);
    modalRef.componentInstance.order=order;

  }

}
