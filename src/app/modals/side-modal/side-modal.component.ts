import { Component, OnInit ,Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-side-modal',
  templateUrl: './side-modal.component.html',
  styleUrls: ['./side-modal.component.scss']
})
export class SideModalComponent implements OnInit {

  @Input() public content;
  add:boolean=false;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    if(this.content=="addOrder")
    {
      this.add=true;
    }
    else{
      console.log("yup product")
      this.add=false;
    }
  }

}
