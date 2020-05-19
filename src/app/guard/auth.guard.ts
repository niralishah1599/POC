import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean{
      if(window.localStorage.getItem('uid')) {
        this.router.navigate(['/pre-landing/dashboard']);
        return false;
      } else {
        return true;
      }
    
  }
  
}
