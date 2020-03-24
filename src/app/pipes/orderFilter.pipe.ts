import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { Iorder } from 'src/app/models/order';

@Pipe({
  name: 'filter'
})
@Injectable({
  providedIn: 'root'
})
export class orderFilter implements PipeTransform {
    transform(items: Iorder[], searchText: string): Iorder[]
    {
        if (!items) {
            return []
          }
        
          return items.filter(item => {
          
          
              if (isNaN(parseInt(searchText)))
             {
                if (item['customerName'].toString().toLowerCase().includes(searchText.toLowerCase())) 
                {
                  return items
                }
              } else 
              {
                if (item['id'].toString().toLowerCase().includes(searchText.toLowerCase()))
                 {
                  return items
                 }
              }
            
        })
    }
}

