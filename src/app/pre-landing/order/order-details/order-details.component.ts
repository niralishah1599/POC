import { Component, OnInit ,Input} from '@angular/core';
//service
import {OrderService} from "src/app/services/order.service";
import {ExcelService} from "src/app/services/excel.service";
//interface
import {Iorder}from "src/app/models/order";
//filter
import {OrderSearchPipe}  from "src/app/core/pipes/order-search.pipe";
//modal
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
//component
import { SideModalComponent } from 'src/app/modals/side-modal/side-modal.component';
import {CenterModalComponent} from 'src/app/modals/center-modal/center-modal.component';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  
  @Input() page = 1;
  @Input() pageSize = 10;
  @Input() collectionSize: number = 100;
  orders:Iorder[]=[];
  content:string="addOrder";
  searchItem:string;
  filteredOrders:Iorder[] = [];
  advanceSearchContent:string="advanceSearch";
  showSpinner:boolean=true; 
  order: string = 'decending';
  sortClass= {
    customerName:'down',
    shipper:'down',
    orderDate:'down'
  }
  constructor(private _orderService:OrderService,private orderSearchPipe:OrderSearchPipe,private modalService:NgbModal,private _excelService:ExcelService) { }

  ngOnInit() {
    this.getAllOrderData();
    this._orderService.getFilteredObs().subscribe(filterData =>{ 
      this.orders=filterData;
      this.collectionSize=this.orders.length;
     
    });
   
  }

  //toGetOrderData
  getAllOrderData()
  {
  this._orderService.getAllData().subscribe(data=>
    {
      console.log(data);
      this.collectionSize = data.length;
      this.filteredOrders=data;
      this.orders=data;
      this.showSpinner=false;
    })
  }

  //toGetOrderDataAfterApplyingFilter
  filterOrder($event){
     this.orders=this.orderSearchPipe.transform(this.filteredOrders, this.searchItem);
    this.collectionSize = this.orders.length
  }

 //toOpenSideModalForAddOrder
  openSideModal(content)
  {
     const modalAddRef=this.modalService.open(SideModalComponent);
      modalAddRef.componentInstance.content=content;
  }
  //toOpenSideModalForEditOrder
  openCenterModal(order:Iorder)
  {
    const modalRef=this.modalService.open(CenterModalComponent);
    modalRef.componentInstance.order=order;

  }
  //toOpenSideModalForAdvanceSearch
  openAdvanceSearchSideModal(advanceSearchcontent)
  {
    const modalSearchRef=this.modalService.open(SideModalComponent);
    modalSearchRef.componentInstance.advanceSearchcontent=advanceSearchcontent;
  }

   //performSortingOnField 
   sortBy(key) {

    if (this.order == 'decending' && this.sortClass[key] == 'down') {
      this._orderService.sortBy(key).subscribe(data => {
        this.orders = data
      })
      this.order = "ascending";
      this.sortClass[key] = 'up';
    }
    else {
      this._orderService.sortBy(key).subscribe(data => {
        this.orders= data.reverse()
      })
      this.order = 'decending';
      this.sortClass[key] = 'down';
    }
  }

  //exportingDataToExcel
  exportToExcel()
  {
    let fileName = 'orders.csv';
    let columnNames = ["Id", "Customer Name", "Shipper", "order Date", "Order Total"];
    this._excelService.exportToExcel(fileName, columnNames, this.orders.slice((this.page - 1)*this.pageSize, (this.page - 1)*this.pageSize + this.pageSize))
    }
  }


