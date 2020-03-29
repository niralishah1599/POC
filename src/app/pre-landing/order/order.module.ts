//module
import {BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes,RouterModule} from  '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule,NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';


//component
import { SideModalComponent } from 'src/app/modals/side-modal/side-modal.component';
import { AddEditOrderComponent } from './add-edit-order/add-edit-order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { CenterModalComponent } from 'src/app/modals/center-modal/center-modal.component';
import { AdvanceSearchComponent } from './advance-search/advance-search.component';
//import {  } from 'src/app/pre-landing/order/advance-search/advance-search.component';
const routes:Routes=[

  {path:'',component:OrderDetailsComponent}

  ]

@NgModule({
  declarations: [
     OrderDetailsComponent
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
   
    SharedModule,
    NgbPaginationModule,
    NgbModule,
   RouterModule.forChild(routes)
  ],
  entryComponents:[
    SideModalComponent,
    AddEditOrderComponent,
    CenterModalComponent,
    AdvanceSearchComponent
  ]
})
export class OrderModule { }
