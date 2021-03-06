import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Iproduct } from 'src/app/models/product';


@Injectable({
  providedIn: 'root'
})

export class ProductService {

  public url = '/products'
  products: Iproduct[] = [];
  //productRef: AngularFireList<Iproduct> = null;

  constructor(
    private angularFireDatabase: AngularFireDatabase) {
   //this.productRef = this.angularFireDatabase.list(this.url);
  }
  //toGetProductData
  getAllData(): Observable<Iproduct[]> {
     return this.angularFireDatabase.list<Iproduct>('/products').valueChanges()
    
  }
  //addProduct
  addProduct(product: Iproduct) {
    this.angularFireDatabase.object('/products/' + (product.id - 1)).set(product);
  }
  //updateProduct
  updateProduct(product) {
    this.angularFireDatabase.object('/products/' + (product.id - 1)).set(product)
  }
 //toGetSuppliersOrCategory
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

  sortBy(key): Observable<Iproduct[]>{
    return this.angularFireDatabase.list<Iproduct>('/products', ref=>ref.orderByChild(key)).valueChanges();
   
   }
}

