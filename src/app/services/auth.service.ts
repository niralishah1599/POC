import { Injectable } from '@angular/core';

// angularfire
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';

// router
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
  register(email,password)
  {
    
   this.angularFireAuth.auth.createUserWithEmailAndPassword(
    email,password
   ).
   then(()=>{
     window.localStorage.setItem('uid',this.angularFireAuth.auth.currentUser.uid)
     this.angularFireDatabase.object('/users/' + localStorage.getItem('uid') + '/userDetails').set({
      email:email,password:password
     })
     
    this.router.navigateByUrl('auth/login')
    }).catch((err)=>{
    alert(err['message'])
    this.router.navigateByUrl('auth/register')
   })
  
  }

  //login
  login(email,password)
  {
    this.angularFireAuth.auth.signInWithEmailAndPassword(
      email,password
    ).then(()=>{
      window.localStorage.setItem('uid',this.angularFireAuth.auth.currentUser.uid)
    this.router.navigateByUrl('/pre-landing/dashboard')
    }).catch((err)=>{
    alert(err['message'])
  })
  }           

  //forgetPassword
  forgetPassword(email)
  {
    console.log(email);
    this.angularFireAuth.auth.sendPasswordResetEmail(email).then(()=>{
      alert("email sent")
     this.router.navigateByUrl('/auth/login')

    })
  }
}
