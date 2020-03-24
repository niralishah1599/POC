import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navbarOpen:boolean=false;
  showProfile:boolean=false;
  localStorage=window.localStorage;
  email:string;
  
  constructor(private angularFireDatabase:AngularFireDatabase,private router:Router) { }

  ngOnInit() {
  }

  toogleNavbar()
  {
    this.navbarOpen=!this.navbarOpen
  }

  logout()
  {
    
    this.localStorage.removeItem('uid');
    this.router.navigateByUrl('auth/login')
  }

  showUserProfile()
  {
   this.showProfile=true;
   this.angularFireDatabase.object('/users/'+this.localStorage.getItem('uid')+'/userDetails').valueChanges().
   subscribe(data=>{
    console.log(data['email'])
   })
  }

}
