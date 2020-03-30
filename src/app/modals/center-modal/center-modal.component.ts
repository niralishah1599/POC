import { Component, OnInit, Input } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Iproduct } from 'src/app/models/product';
import { Iorder } from 'src/app/models/order';

@Component({
  selector: 'app-center-modal',
  templateUrl: './center-modal.component.html',
  styleUrls: ['./center-modal.component.scss']
})

export class CenterModalComponent implements OnInit {

  @Input() public product:Iproduct;
  @Input() public order:Iorder;
  
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
