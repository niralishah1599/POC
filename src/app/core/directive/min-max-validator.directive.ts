import { Directive , Input, HostBinding} from '@angular/core';
import { Validators } from '@angular/forms';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';
@Directive({
  selector: '[customMin][formControlName],[customMin][formControl],[customMin][ngModel], [customMax][formControlName],[customMax][formControl],[customMax][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting:  MinMaxValidatorDirective , multi: true}]
})
export class MinMaxValidatorDirective implements Validators {

  constructor() { }
 @Input() customMin: number;
 @Input() customMax: number;
 @HostBinding(`style.border-color`) bcolor = '';
 validate(c: FormControl): {[key: string]: any} {
      let v = c.value;
     
      if( v < this.customMin){
        
        return ( v < this.customMin) ? { 'customMin' : true }  : null;

      }
      if( v > this.customMax){
        
        return ( v > this.customMax) ? { 'customMax' : true}  : null;

     
        }
  }
}
