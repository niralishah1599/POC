import {Component,OnInit,Input} from '@angular/core';
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
      this.order=!this.order;
    }
    if(this.content=="addProduct")
    {
      this.product=!this.product;
    }
    if(this.advanceSearchcontent=="advanceSearch")
    {
     this.search=!this.search;
    }
  }

}
