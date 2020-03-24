import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Iproduct } from 'src/app/models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = '/products'
  products: Iproduct[] = [];
  productRef: AngularFireList<Iproduct> = null;

  constructor(
    private angularFireDatabase: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth) {
    this.productRef = this.angularFireDatabase.list(this.url);
  }

  addProduct(product: Iproduct) {
    this.angularFireDatabase.object('/products/' + (product.id - 1)).set(product);
  }

  updateProduct(product) {
    this.angularFireDatabase.object('/products/' + (product.id - 1)).set(product)
  }



  getAllData(): Observable<Iproduct[]> {
    return this.angularFireDatabase.list<Iproduct>('/products').valueChanges()
  }

  getSuppliersOrCategories(property) {
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

