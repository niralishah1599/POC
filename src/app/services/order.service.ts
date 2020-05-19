import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { Iorder } from 'src/app/models/order';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private filteredData: BehaviorSubject<Iorder[]> = new BehaviorSubject([]);

  constructor(private angularFireDatabase: AngularFireDatabase) {}


  //toGetFilteredObs
  getFilteredObs(): Observable<Iorder[]> {
    return this.filteredData.asObservable();
  }

  //toGetNextFilterData
  filterdData(filterdObj: Iorder[]) {
    this.filteredData.next(filterdObj);

  }

  //togetOrderData
  getAllData(): Observable<Iorder[]> {
    return this.angularFireDatabase.list<Iorder>('/orders').valueChanges()
  }

  //addOrder
  addOrder(order: Iorder) {
    this.angularFireDatabase.object('/orders/' + (order.id - 1)).set(order);
  }
  //updateOrder
  updateOrder(order) {
    this.angularFireDatabase.object('/orders/' + (order.id - 1)).set(order);
  }
  //getCustomerNameOrShipper
  getCustomerNameOrShipper(property) {
    property = property.filter((data, index) => {
      if (index != 0) {
        if (property.slice(0, index).indexOf(data) == -1) {
          return data
        }
      } else {
        return data
      }
    })
    return property
  }
  sortBy(key): Observable<Iorder[]>{
    return this.angularFireDatabase.list<Iorder>('/orders', ref=>ref.orderByChild(key)).valueChanges();
   
   }
} 