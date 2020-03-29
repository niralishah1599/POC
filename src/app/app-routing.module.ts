import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

//firebase module

const routes: Routes = [
  {
    path:'',
    redirectTo:'auth',
    pathMatch:'full'
  },
  {
    path:'auth',
    loadChildren:() => import('./auth/auth.module').then(a=>a.AuthModule)
  },
  {
    path:'pre-landing',
    loadChildren:() => import('./pre-landing/pre-landing.module').then(pre=>pre.PreLandingModule)
  },
  {
    path:'**',
    component:PageNotFoundComponent
  }
];

@NgModule({
  declarations:[
  
  ],
  imports: [
 AngularFontAwesomeModule,
  RouterModule.forRoot(routes),
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
