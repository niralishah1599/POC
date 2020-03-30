import { Directive , Input} from '@angular/core';
import {AbstractControl,NG_VALIDATORS,Validators} from '@angular/forms';

@Directive({
  selector: '[appNoContainSpace]',
  providers:[{provide:NG_VALIDATORS,useExisting:NoContainSpaceDirective,multi:true}]
})
export class NoContainSpaceDirective implements Validators{

  constructor() { }

  @Input('appNoContainSpace') spaceNotAllowed:string;

  validate(control:AbstractControl):{[key:string]:any}|null
  {
    // const notAllowed = new RegExp(this.spaceNotAllowed).test(control.value);
    if (control && control.value && !control.value.replace(/\s/g, '').length) {
      control.setValue('');
   
      return { spaceNotAllowed: true }
  }
  else {
      return null;
  }
  }
 
}
