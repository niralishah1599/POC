import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

import {environment} from '../environments/environment';
//import { SideModalComponent } from './modals/side-modal/side-modal.component';
import { CenterModalComponent } from './modals/center-modal/center-modal.component';
import { AddEditProductComponent } from './pre-landing/product/add-edit-product/add-edit-product.component';
import { NoContainSpaceDirective } from './auth/custom-validator/no-contain-space.directive';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { AddEditOrderComponent } from './add-edit-order/add-edit-order.component';



export const firebaseConfig = environment.firebaseConfig

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
    
   
    
 ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent],
 
})
export class AppModule { }
