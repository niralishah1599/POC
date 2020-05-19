import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  
  constructor(private _authService:AuthService) { }

  ngOnInit() {}

  //forget password
  forgetPassword(email){
    this._authService.forgetPassword(email);
  }
 
}
