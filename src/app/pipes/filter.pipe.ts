import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { Iproduct } from 'src/app/models/product';

@Pipe({
  name: 'filter'
})
@Injectable({
  providedIn: 'root'
})
export class FilterPipe implements PipeTransform {

  transform(items: Iproduct[], searchText: string, supplier: string, category: string): Iproduct[] {
    if (!items) {
      return []
    }

    return items.filter(item => {

      if (searchText && !supplier && !category) {
        if (isNaN(parseInt(searchText))) {
          if (item['name'].toString().toLowerCase().includes(searchText.toLowerCase())) {
            return items
          }
        } else {
          if (item['id'].toString().toLowerCase().includes(searchText.toLowerCase())) {
            return items
          }
        }
      }

      if (!searchText && supplier && !category) {
        if (item['supplier'].toString().toLowerCase().includes(supplier.toLowerCase())) {
          return items
        }
      }

      if (!searchText && !supplier && category) {
        if (item['category'].toString().toLowerCase().includes(category.toLowerCase())) {
          return items
        }
      }

      if (searchText && supplier && !category) {
        if (isNaN(parseInt(searchText))) {
          if (
            item['name'].toString().toLowerCase().includes(searchText.toLowerCase()) &&
            item['supplier'].toString().toLowerCase().includes(supplier.toLowerCase())
          ) {
            return items
          }
        } else {
          if (
            item['id'].toString().toLowerCase().includes(searchText.toLowerCase()) &&
            item['supplier'].toString().toLowerCase().includes(supplier.toLowerCase())
          ) {
            return items
          }
        }
      }

      if (searchText && !supplier && category) {
        if (isNaN(parseInt(searchText))) {
          if (
            item['name'].toString().toLowerCase().includes(searchText.toLowerCase()) &&
            item['category'].toString().toLowerCase().includes(category.toLowerCase())
          ) {
            return items
          }
        } else {
          if (
            item['id'].toString().toLowerCase().includes(searchText.toLowerCase()) &&
            item['category'].toString().toLowerCase().includes(category.toLowerCase())
          ) {
            return items
          }
        }
      }

      if (!searchText && supplier && category) {
        if (
          item['supplier'].toString().toLowerCase().includes(supplier.toLowerCase()) &&
          item['category'].toString().toLowerCase().includes(category.toLowerCase())
        ) {
          return items
        }
      }

      if (searchText && supplier && category) {
        if (isNaN(parseInt(searchText))) {
          if (
            item['name'].toString().toLowerCase().includes(searchText.toLowerCase()) &&
            item['supplier'].toString().toLowerCase().includes(supplier.toLowerCase()) &&
            item['category'].toString().toLowerCase().includes(category.toLowerCase())
          ) {
            return items
          }
        } else {
          if (
            item['id'].toString().toLowerCase().includes(searchText.toLowerCase()) &&
            item['supplier'].toString().toLowerCase().includes(supplier.toLowerCase()) &&
            item['category'].toString().toLowerCase().includes(category.toLowerCase())
          ) {
            return items
          }
        }
      }

      if (!searchText && !supplier && !category) {
        return items
      }

    })
  }
}