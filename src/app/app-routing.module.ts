import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ProtectGuard } from 'src/app/guard/protect.guard'
import { AuthGuard } from './guard/auth.guard';
//firebase module

const routes: Routes = [
  {
    path:'',
    redirectTo:'auth',
    pathMatch:'full'
  },
  {
    path:'auth',
    loadChildren:() => import('./auth/auth.module').then(a=>a.AuthModule),
    canActivate: [AuthGuard]
  },
  {
    path:'pre-landing',
    loadChildren:() => import('./pre-landing/pre-landing.module').then(pre=>pre.PreLandingModule),
    canActivate: [ProtectGuard]
  },
  {
    path:'**',
    component:PageNotFoundComponent
  }
];

@NgModule({
  declarations:[],
  imports: [
   AngularFontAwesomeModule,
  RouterModule.forRoot(routes,{useHash:true})
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
