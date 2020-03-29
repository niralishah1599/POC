import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';
import { BehaviorSubject,Observable } from 'rxjs';
import { Iorder } from 'src/app/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  private filteredData: BehaviorSubject<Iorder[]> = new BehaviorSubject([]);
  
  constructor(private angularFireDatabase:AngularFireDatabase) { }

    getFilteredObs(): Observable<Iorder[]> {
        return this.filteredData.asObservable();
    }


    filterdData(filterdObj:Iorder[])
    {
      this.filteredData.next(filterdObj);

    }

  getAllData(): Observable<Iorder[]> {
    return this.angularFireDatabase.list<Iorder>('/orders').valueChanges()
  }

  addOrder(order: Iorder) {
    this.angularFireDatabase.object('/orders/' + (order.id - 1)).set(order);
  }

  updateOrder(order) {
    this.angularFireDatabase.object('/orders/' + (order.id - 1)).set(order);
  }

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

 
 
}
