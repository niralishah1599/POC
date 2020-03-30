import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  
  constructor(private router:Router) { }

  ngOnInit() {}

  //redirect to login
  goBackToLogin()
  {
    this.router.navigateByUrl('/auth/login')
  }

}
