import { Directive, SimpleChanges, HostBinding , Input, OnChanges} from '@angular/core';

@Directive({
  selector: '[appInputBorderColor]'
})
export class BorderColorDirective implements OnChanges{

  @Input('appInputBorderColor') discount: number;
  @HostBinding(`style.border-color`) bcolor = '';
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {

    if(this.discount>=1 && this.discount<15  )
    {
      this.bcolor = "red";
    }
    else if((this.discount>=15 && this.discount<30))
    {
      this.bcolor = "yellow"; 
    }
    else
    {
      this.bcolor = "green";
    }
}
}
