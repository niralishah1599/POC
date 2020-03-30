import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class CanActivateGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean{
    if(window.localStorage.getItem('uid')) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
