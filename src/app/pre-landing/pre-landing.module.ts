//module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {ChartsModule} from 'ng2-charts';
//component
import { PreLandingComponent } from './pre-landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { ProtectGuard } from '../guard/protect.guard';

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
        component:DashboardComponent,
        canActivate: [ProtectGuard]
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
    PreLandingComponent
  ],
  imports: [
    CommonModule,
    ChartsModule,
    RouterModule.forChild(routes)
  ],

  }
)
export class PreLandingModule { }
