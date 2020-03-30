import { Component, OnInit ,Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-side-modal',
  templateUrl: './side-modal.component.html',
  styleUrls: ['./side-modal.component.scss']
})
export class SideModalComponent implements OnInit {

  @Input() public content;
  @Input() public advanceSearchcontent;
  order:boolean=false;
  search:boolean=false;
  product:boolean=false;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
 
    if(this.content=="addOrder")
    {
      this.order=true;
    }
    if(this.content=="addProduct")
    {
      this.product=true;
    }
    if(this.advanceSearchcontent=="advanceSearch")
   {
     this.search=true;
   }
  }

}
