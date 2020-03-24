import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule,NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap'; 
import {Routes, RouterModule} from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideModalComponent } from 'src/app/modals/side-modal/side-modal.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { CenterModalComponent } from 'src/app/modals/center-modal/center-modal.component';
import { PreLandingModule } from '../pre-landing.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

const routes:Routes=[
{
  path:'',
  component:ProductDetailsComponent

}
]

@NgModule({
  declarations: [
    ProductDetailsComponent,
  
   
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbPaginationModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  entryComponents:[
    SideModalComponent,
    AddEditProductComponent,
    CenterModalComponent
  ]
  
})
export class ProductModule { }
