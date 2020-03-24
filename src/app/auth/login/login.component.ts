import { Component, OnInit } from '@angular/core';
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
  constructor(private  authService:AuthService) { }

  ngOnInit() {
  }

  login(formData)
  {
    this.authService.login(formData);
  }
}
