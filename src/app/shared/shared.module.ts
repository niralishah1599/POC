import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideModalComponent } from '../modals/side-modal/side-modal.component';
import { AddEditOrderComponent } from '../pre-landing/order/add-edit-order/add-edit-order.component';
import { AddEditProductComponent } from '../pre-landing/product/add-edit-product/add-edit-product.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CenterModalComponent } from '../modals/center-modal/center-modal.component';
import { AdvanceSearchComponent } from '../pre-landing/order/advance-search/advance-search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from '../core/loader/loader.component';



@NgModule({
  declarations: [
    SideModalComponent,
    AddEditOrderComponent,
    AddEditProductComponent,
    CenterModalComponent,
    AdvanceSearchComponent,
    LoaderComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    SideModalComponent,
    AddEditOrderComponent,
    AddEditProductComponent,
    AdvanceSearchComponent,
    CenterModalComponent,
    LoaderComponent
    ],
    bootstrap:[
      AdvanceSearchComponent
    ]
  
})
export class SharedModule { }
