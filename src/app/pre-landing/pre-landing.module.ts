import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//routes
import {Router,Routes, RouterModule} from '@angular/router';
import { PreLandingComponent } from './pre-landing.component';
import { DashboardComponent } from './header/dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import { SideModalComponent } from '../modals/side-modal/side-modal.component';
const routes:Routes=[
  {
    path:'',
    component:PreLandingComponent,
    children:[
      {
        path:'',
        redirectTo:'dashboard',
        pathMatch:'full'
      },
      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
        path:'product',
        loadChildren:() => import('./product/product.module').then(pr=>pr.ProductModule)
      },
      {
        path:'order',
        loadChildren:() => import('./order/order.module').then(or=>or.OrderModule)
      }

    ]
  }
]
@NgModule({
  declarations: [
    HeaderComponent,
    DashboardComponent,
    PreLandingComponent,
  
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],

  }
)
export class PreLandingModule { }
