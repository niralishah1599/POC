import { Component, OnInit } from '@angular/core';
import {Iuser} from 'src/app/models/user';
import {Router} from '@angular/router'
//Services
import {AuthService} from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  user:Iuser={email:"",password:""}
  
  
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit() {
  }

  register(formData)
  {
    this.authService.register(formData)
    
  }
}
