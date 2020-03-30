import { Component, OnInit } from '@angular/core';
//router
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navbarOpen:boolean=false;
  localStorage=window.localStorage;
 
  
  constructor(private router:Router) { }

  ngOnInit() {
  }
 
  //perform toogle
  toogleNavbar()
  {
    this.navbarOpen=!this.navbarOpen
  }

  //logout
  logout()
  {
    
    this.localStorage.removeItem('uid');
    this.router.navigateByUrl('auth/login')
  }

  
}
