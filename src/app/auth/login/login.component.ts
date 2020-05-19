import { Component, OnInit } from '@angular/core';
//interface
import {Iuser} from 'src/app/models/user';
//services
import {AuthService} from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user:Iuser={email:"",password:""}
  
  constructor(private  _authService:AuthService) { }

  ngOnInit() {}

  //login
  login()
  {
    this._authService.login(this.user.email,this.user.password);
  }
}
