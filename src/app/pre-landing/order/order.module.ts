import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes,RouterModule} from  '@angular/router'
import { OrderDetailsComponent } from './order-details/order-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule,NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { SideModalComponent } from 'src/app/modals/side-modal/side-modal.component';
import { AddEditOrderComponent } from './add-edit-order/add-edit-order.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditProductComponent } from '../product/add-edit-product/add-edit-product.component';
import { CenterModalComponent } from 'src/app/modals/center-modal/center-modal.component';
const routes:Routes=[
  {
    path:'',
    component:OrderDetailsComponent
  
  }
  ]

@NgModule({
  declarations: [
     OrderDetailsComponent,
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    NgbPaginationModule,
   RouterModule.forChild(routes)
  ],
  entryComponents:[
    SideModalComponent,
    AddEditOrderComponent,
    CenterModalComponent
  ]
})
export class OrderModule { }
