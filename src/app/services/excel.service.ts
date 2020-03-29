import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  exportToExcel(fileName: string, columnNames: string[], items)
  {
    let header = columnNames.join(',');
    
    let excel = header;
    excel += '\r\n';
    
    if (columnNames.length == 7) {
    items.map(item => {
    excel += [item['id'], item['name'], item['supplier'], item['category'], item['price'], item['discounted'], item['discount']].join(',');
    excel += '\r\n';
    })
    } else {
    items.map(item => {
    excel += [item['id'], item['customerName'], item['shipper'], item['orderDate'], item['orderTotal']].join(',');
    excel += '\r\n';
    })
    }
    
    var blob = new Blob([excel], { type: 'application/vnd.ms-excel' });
    
    var aTag = document.createElement('a');
    
    var url = URL.createObjectURL(blob);
    aTag.setAttribute('href', url);
    aTag.setAttribute('download', fileName);
    document.body.appendChild(aTag);
    aTag.click();
    document.body.removeChild(aTag);
  }
}
