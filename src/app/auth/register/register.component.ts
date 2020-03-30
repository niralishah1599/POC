import { Component, OnInit } from '@angular/core';
//interface
import {Iuser} from 'src/app/models/user';
//Service
import {AuthService} from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  user:Iuser={email:"",password:""}
  
  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  //register
  register(formData)
  {
    this.authService.register(formData)
  }
}
