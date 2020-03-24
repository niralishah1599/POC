import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideModalComponent } from '../modals/side-modal/side-modal.component';
import { AddEditOrderComponent } from '../pre-landing/order/add-edit-order/add-edit-order.component';
import { AddEditProductComponent } from '../pre-landing/product/add-edit-product/add-edit-product.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CenterModalComponent } from '../modals/center-modal/center-modal.component';



@NgModule({
  declarations: [
    SideModalComponent,
    AddEditOrderComponent,
    AddEditProductComponent,
    CenterModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    SideModalComponent,
    AddEditOrderComponent,
    AddEditProductComponent,
    CenterModalComponent,
    ]
  
})
export class SharedModule { }
