//module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';

//component
import { PreLandingComponent } from './pre-landing.component';
import { DashboardComponent } from './header/dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';

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
