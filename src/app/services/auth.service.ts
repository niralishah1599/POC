import { Injectable } from '@angular/core';

//angularfire
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
//router
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private angularFireDatabase: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private router:Router
  ) { }

  //registration
  register(formData)
  {
    
   this.angularFireAuth.auth.createUserWithEmailAndPassword(
    formData.value.email, formData.value.password
   ).
   then(()=>{
     window.localStorage.setItem('uid',this.angularFireAuth.auth.currentUser.uid)
     this.angularFireDatabase.object('/users/' + localStorage.getItem('uid') + '/userDetails').set({
      email: formData.value.email,password:formData.value.password
     })
     
    this.router.navigateByUrl('auth/login')
    }).catch((err)=>{
    alert(err['message'])
    this.router.navigateByUrl('auth/register')
   })
  
  }

  //login
  login(formData)
  {
    
   window.localStorage.setItem('uid',this.angularFireAuth.auth.currentUser.uid)
    this.angularFireAuth.auth.signInWithEmailAndPassword(
      formData.value.email,formData.value.password
    ).then(()=>{
    this.router.navigateByUrl('/pre-landing/dashboard')
    }).catch((err)=>{
    alert(err['message'])
  })
  }

  //forgetPassword
  forgetPassword(formData)
  {
  
    this.angularFireAuth.auth.sendPasswordResetEmail(formData.value.email).then(()=>{
      alert("email sent")
     this.router.navigateByUrl('/auth/login')

    })
  }
}
