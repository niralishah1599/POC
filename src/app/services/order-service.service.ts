import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Iorder } from 'src/app/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(private angularFireDatabase:AngularFireDatabase) { }

  getAllData(): Observable<Iorder[]> {
    return this.angularFireDatabase.list<Iorder>('/orders').valueChanges()
  }

  addProduct(order: Iorder) {
    this.angularFireDatabase.object('/orders/' + (order.id - 1)).set(order);
  }

  updateProduct(order) {
    this.angularFireDatabase.object('/orders/' + (order.id - 1)).set(order);
  }

}
