import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

//component
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { NoContainSpaceDirective } from '../core/directive/no-contain-space.directive';



const routes:Routes=[
  {
    path:'',
    component:AuthComponent,

    children:[
      {
          path:'',
          redirectTo:'login',
          pathMatch:'full'
      },
      {
         path:'login',
         component:LoginComponent
      },
      {
        path:'register',
        component:RegisterComponent
      },
      {
        path:'forget-password',
        component:ForgetPasswordComponent
      }

    ]
  }

]

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    NoContainSpaceDirective
   ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
