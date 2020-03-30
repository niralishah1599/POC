import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class CanLoadGuard implements CanLoad {
  constructor(private router: Router) { }

  canLoad(): boolean {
    if (window.localStorage.getItem('uid')) {
      console.log('valid')
      return true;
    } else {
      console.log('invalid')
      this.router.navigateByUrl('/auth/login')
      return false;
    }
  }
}
