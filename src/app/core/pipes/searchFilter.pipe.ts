import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { Iorder } from 'src/app/models/order';
import { IadvanceSearch } from 'src/app/models/advanceSearch';

@Pipe({
  name: 'filter'
})
@Injectable({
  providedIn: 'root'
})

export class searchFilter implements PipeTransform {

  selectedFromDate: string;
  selectedToDate: string;

transform(items: Iorder[], selectedFields: IadvanceSearch): Iorder[] {
  //forOrderDate
  if ((selectedFields.selectedFromDate != null) || (selectedFields.selectedToDate != null)) {

      if (selectedFields.selectedFromDate) {

        if ((selectedFields.selectedFromDate['month'] <= 9) && selectedFields.selectedFromDate['day'] <= 9) {
          this.selectedFromDate = selectedFields.selectedFromDate['year'] + '-0' + selectedFields.selectedFromDate['month'] + '-0' + selectedFields.selectedFromDate['day'];
         
        }
        else if (selectedFields.selectedFromDate['month'] <= 9 && selectedFields.selectedFromDate['day'] >= 9) {
          this.selectedFromDate = selectedFields.selectedFromDate['year'] + '-0' + selectedFields.selectedFromDate['month'] + '-' + selectedFields.selectedFromDate['day']
          
        }
        else if (selectedFields.selectedFromDate['month'] >= 9 && selectedFields.selectedFromDate['day'] <= 9) {
          this.selectedFromDate = selectedFields.selectedFromDate['year'] + '-' + selectedFields.selectedFromDate['month'] + '-0' + selectedFields.selectedFromDate['day']
        }
        else {
          this.selectedFromDate = selectedFields.selectedFromDate['year'] + '-' + selectedFields.selectedFromDate['month'] + '-' + selectedFields.selectedFromDate['day']
          }

      }

      if (selectedFields.selectedToDate) {
        if ((selectedFields.selectedToDate['month'] <= 9) && selectedFields.selectedToDate['day'] <= 9) {
          this.selectedToDate = selectedFields.selectedToDate['year'] + '-0' + selectedFields.selectedToDate['month'] + '-0' + selectedFields.selectedToDate['day'];
        }
        else if (selectedFields.selectedToDate['month'] <= 9 && selectedFields.selectedToDate['day'] >= 9) {
          this.selectedToDate = selectedFields.selectedToDate['year'] + '-0' + selectedFields.selectedToDate['month'] + '-' + selectedFields.selectedToDate['day'];
        }
        else if (selectedFields.selectedToDate['month'] >= 9 && selectedFields.selectedToDate['day'] <= 9) {
         this.selectedToDate = selectedFields.selectedToDate['year'] + '-' + selectedFields.selectedToDate['month'] + '-0' + selectedFields.selectedToDate['day'];
        }
        else {
           this.selectedToDate = selectedFields.selectedToDate['year'] + '-' + selectedFields.selectedToDate['month'] + '-' + selectedFields.selectedToDate['day'];
         }
      }
    }


    return items.filter(item => {
      //console.log(selectedFields);
      //orderToAmount
      if ((selectedFields.selectedToAmount != 0) && (selectedFields.selectedCustomerNames == null && selectedFields.selectedFromDate == null && selectedFields.selectedShippers == null && selectedFields.selectedFromAmount == null && selectedFields.selectedToDate == null)) {
        return item['orderTotal'] <= selectedFields.selectedToAmount
      }
      //orderFromAmount
      if ((selectedFields.selectedFromAmount != 0) && (selectedFields.selectedCustomerNames == null && selectedFields.selectedFromDate == null && selectedFields.selectedShippers == null && selectedFields.selectedToAmount == null && selectedFields.selectedToDate == null)) {
        return item['orderTotal'] >= selectedFields.selectedFromAmount

      }
      //CustomerNames
      if ((selectedFields.selectedCustomerNames && selectedFields.selectedShippers == null) && (selectedFields.selectedFromAmount == null && selectedFields.selectedFromDate == null && selectedFields.selectedShippers == null && selectedFields.selectedToAmount == null && selectedFields.selectedToDate == null)) {
        return selectedFields.selectedCustomerNames.indexOf(item['customerName']) > -1
      }
      //shippers
      if ((selectedFields.selectedShippers && selectedFields.selectedCustomerNames == null) && (selectedFields.selectedFromAmount == null && selectedFields.selectedFromDate == null && selectedFields.selectedCustomerNames == null && selectedFields.selectedToAmount == null && selectedFields.selectedToDate == null)) {
        return selectedFields.selectedShippers.indexOf(item['shipper']) > -1
      }
      //OrderFromDate
      if ((this.selectedFromDate) &&
        (selectedFields.selectedFromAmount == null && selectedFields.selectedShippers == null && selectedFields.selectedCustomerNames == null && selectedFields.selectedToAmount == null && selectedFields.selectedToDate == null)) {
        return item['orderDate'] >= this.selectedFromDate;
      }
      ////OrderToDate
      if ((this.selectedToDate) && (selectedFields.selectedFromAmount == null && selectedFields.selectedFromDate == null && selectedFields.selectedCustomerNames == null && selectedFields.selectedToAmount == null && selectedFields.selectedShippers == null)) {
        return item['orderDate'] <= this.selectedToDate;
      }

      //Shippers&&CustomerNames
      if ((selectedFields.selectedShippers && selectedFields.selectedCustomerNames) && (selectedFields.selectedFromAmount == null && selectedFields.selectedFromDate == null && selectedFields.selectedToAmount == null && selectedFields.selectedToDate == null)) {
        return (selectedFields.selectedShippers.indexOf(item['shipper']) > -1) && (selectedFields.selectedCustomerNames.indexOf(item['customerName']) > -1)
      }

      //Shippers&&orderFromDate
      if ((selectedFields.selectedShippers && this.selectedFromDate) &&
        (selectedFields.selectedCustomerNames == null && selectedFields.selectedFromAmount == null && selectedFields.selectedToAmount == null && selectedFields.selectedToDate == null)) {
        return (selectedFields.selectedShippers.indexOf(item['shipper']) > -1) && (item['orderDate'] >= this.selectedFromDate)


      }

       //Shippers&&orderToDate
      if ((selectedFields.selectedShippers && this.selectedToDate) &&
        (selectedFields.selectedCustomerNames == null && selectedFields.selectedFromAmount == null && selectedFields.selectedToAmount == null && selectedFields.selectedFromDate == null)) {
        return (selectedFields.selectedShippers.indexOf(item['shipper']) > -1) && (item['orderDate'] <= this.selectedToDate)


      }

      //shippers&&customerNames&&orderFromAmount
      if ((selectedFields.selectedShippers && selectedFields.selectedFromAmount) &&
        (selectedFields.selectedCustomerNames == null && selectedFields.selectedToAmount == null && selectedFields.selectedFromDate == null && selectedFields.selectedToDate == null)) {
        {
          return (selectedFields.selectedShippers.indexOf(item['shipper']) > -1) && (selectedFields.selectedCustomerNames.indexOf(item['customerName']) > -1)

        }
      }


      //shippers&&customerNames&&orderToAmount
      if ((selectedFields.selectedShippers && selectedFields.selectedToAmount) &&
        (selectedFields.selectedCustomerNames == null && selectedFields.selectedFromAmount == null && selectedFields.selectedFromDate == null && selectedFields.selectedToDate == null)) {
        {
          return (selectedFields.selectedShippers.indexOf(item['shipper']) > -1) && (item['orderTotal'] <= selectedFields.selectedToAmount)

        }
      }

      //shippers&&customerNames&&orderFromDate
      if ((selectedFields.selectedShippers && selectedFields.selectedCustomerNames && this.selectedFromDate) &&
        (selectedFields.selectedFromAmount == null && selectedFields.selectedToAmount == null && selectedFields.selectedToDate == null)) {
        {

          return (selectedFields.selectedShippers.indexOf(item['shipper']) > -1) &&
            (selectedFields.selectedCustomerNames.indexOf(item['customerName']) > -1)
            && (item['orderDate'] >= this.selectedFromDate)

        }
      }

      //shippers&&customerNames&&orderToDate
      if ((selectedFields.selectedShippers && selectedFields.selectedCustomerNames && this.selectedToDate) &&
        (selectedFields.selectedFromAmount == null && selectedFields.selectedToAmount == null && selectedFields.selectedFromDate == null)) {
        {

          return (selectedFields.selectedShippers.indexOf(item['shipper']) > -1) &&
            (selectedFields.selectedCustomerNames.indexOf(item['customerName']) > -1)
            && (item['orderDate'] <= this.selectedToDate)

        }
      }
      //shippers&&customerNames&&OrderFromAmount
      if ((selectedFields.selectedShippers && selectedFields.selectedCustomerNames && selectedFields.selectedFromAmount) &&
        (selectedFields.selectedToDate == null && selectedFields.selectedToAmount == null && selectedFields.selectedFromDate == null)) {
        {

          return (selectedFields.selectedShippers.indexOf(item['shipper']) > -1) &&
            (selectedFields.selectedCustomerNames.indexOf(item['customerName']) > -1)
            && (item['orderTotal'] >= selectedFields.selectedFromAmount)

        }
      }

      //shippers&&customerNames&&OrderToAmount
      if ((selectedFields.selectedShippers && selectedFields.selectedCustomerNames && selectedFields.selectedToAmount) &&
        (selectedFields.selectedToDate == null && selectedFields.selectedFromAmount == null && selectedFields.selectedFromDate == null)) {
        {

          return (selectedFields.selectedShippers.indexOf(item['shipper']) > -1) &&
            (selectedFields.selectedCustomerNames.indexOf(item['customerName']) > -1)
            && (item['orderTotal'] <= selectedFields.selectedToAmount)

        }
      }

      //shippers&&customerNames&&orderFromDate&&orderToDate
      if ((selectedFields.selectedShippers && selectedFields.selectedCustomerNames && this.selectedFromDate && this.selectedToDate) &&
        (selectedFields.selectedFromAmount == null && selectedFields.selectedToAmount == null)) {
        {

          return (selectedFields.selectedShippers.indexOf(item['shipper']) > -1) &&
            (selectedFields.selectedCustomerNames.indexOf(item['customerName']) > -1)
            && (item['orderDate'] >= this.selectedFromDate) &&
            (item['orderDate'] <= this.selectedToDate)

        }
      }

      //shippers&&customerNames&&orderFromDate&&orderFromAmount&&OrderFromdate
      if ((selectedFields.selectedShippers && selectedFields.selectedCustomerNames && this.selectedFromDate && selectedFields.selectedFromAmount) &&
        (selectedFields.selectedToDate == null && selectedFields.selectedToAmount == null)) {
        {

          return (selectedFields.selectedShippers.indexOf(item['shipper']) > -1) &&
            (selectedFields.selectedCustomerNames.indexOf(item['customerName']) > -1)
            && (item['orderDate'] >= this.selectedFromDate) &&
            (item['orderTotal'] >= selectedFields.selectedFromAmount)

        }
      }

      //shippers&&customerNames&&orderFromDate&&o&&OrderToAmount
      if ((selectedFields.selectedShippers && selectedFields.selectedCustomerNames && this.selectedFromDate && selectedFields.selectedToAmount) &&
        (selectedFields.selectedToDate == null && selectedFields.selectedFromAmount == null)) {
        {

          return (selectedFields.selectedShippers.indexOf(item['shipper']) > -1) &&
            (selectedFields.selectedCustomerNames.indexOf(item['customerName']) > -1)
            && (item['orderDate'] >= this.selectedFromDate) &&
            (item['orderTotal'] <= selectedFields.selectedToAmount)

        }
      }


      //shippers&&customerNames&&orderFromDate&&orderToDate&&OrderFromAmount
      if ((selectedFields.selectedShippers && selectedFields.selectedCustomerNames && this.selectedFromDate && this.selectedToDate && selectedFields.selectedFromAmount) &&
        (selectedFields.selectedToAmount == null)) {
        {

          return (selectedFields.selectedShippers.indexOf(item['shipper']) > -1) &&
            (selectedFields.selectedCustomerNames.indexOf(item['customerName']) > -1)
            && (item['orderDate'] >= this.selectedFromDate) &&
            (item['orderDate'] <= this.selectedToDate) &&
            (item['orderTotal'] >= selectedFields.selectedFromAmount)
        }
      }
      //shippers&&customerNames&&orderFromDate&&orderToDate&&OrderToAmount
      if ((selectedFields.selectedShippers && selectedFields.selectedCustomerNames && this.selectedFromDate && this.selectedToDate && selectedFields.selectedToAmount) &&
        (selectedFields.selectedFromAmount == null)) {
        {

          return (selectedFields.selectedShippers.indexOf(item['shipper']) > -1) &&
            (selectedFields.selectedCustomerNames.indexOf(item['customerName']) > -1)
            && (item['orderDate'] >= this.selectedFromDate)
            && (item['orderDate'] <= this.selectedToDate)
            && (item['orderTotal'] <= selectedFields.selectedToAmount)
        }
      }

      ////6fileds
      if (selectedFields.selectedShippers && selectedFields.selectedCustomerNames && this.selectedFromDate && this.selectedToDate && selectedFields.selectedToAmount && selectedFields.selectedFromAmount) {


        return (selectedFields.selectedShippers.indexOf(item['shipper']) > -1) &&
          (selectedFields.selectedCustomerNames.indexOf(item['customerName']) > -1)
          && (item['orderDate'] >= this.selectedFromDate)
          && (item['orderDate'] <= this.selectedToDate)
          && (item['orderTotal'] >= selectedFields.selectedFromAmount)
          && (item['orderTotal'] <= selectedFields.selectedToAmount)

      }

      //customerName && OrderDateFrom
      if ((selectedFields.selectedCustomerNames && this.selectedFromDate) && (selectedFields.selectedFromAmount == null && selectedFields.selectedToDate == null && selectedFields.selectedShippers == null && selectedFields.selectedToAmount == null)) {
        return (selectedFields.selectedCustomerNames.indexOf(item['customerName']) > -1) &&
          (item['orderDate'] >= this.selectedFromDate)
      }

      //customerName && OrderDateTo
      if ((selectedFields.selectedCustomerNames && this.selectedToDate) && (selectedFields.selectedFromAmount == null && selectedFields.selectedFromDate == null && selectedFields.selectedShippers == null && selectedFields.selectedToAmount == null)) {
        return (selectedFields.selectedCustomerNames.indexOf(item['customerName']) > -1) &&
          (item['orderDate'] <= this.selectedToDate)
      }


      //customerName && selectedFromAmount
      if ((selectedFields.selectedCustomerNames && selectedFields.selectedFromAmount) && (selectedFields.selectedToDate == null && selectedFields.selectedFromDate == null && selectedFields.selectedShippers == null && selectedFields.selectedToAmount == null)) {
        return (selectedFields.selectedCustomerNames.indexOf(item['customerName']) > -1) &&
          (item['orderTotal'] >= selectedFields.selectedFromAmount)
      }


      //customerName && selectedToAmount
      if ((selectedFields.selectedCustomerNames && selectedFields.selectedToAmount) && (selectedFields.selectedToDate == null && selectedFields.selectedFromDate == null && selectedFields.selectedShippers == null && selectedFields.selectedFromAmount == null)) {
        return (selectedFields.selectedCustomerNames.indexOf(item['customerName']) > -1) &&
          (item['orderTotal'] <= selectedFields.selectedToAmount)
      }

      ///customerName && OrderDateFrom && orderDateTo

      if ((selectedFields.selectedCustomerNames && this.selectedFromDate && this.selectedToDate) &&
        (selectedFields.selectedFromAmount == null && selectedFields.selectedToAmount == null && selectedFields.selectedShippers == null)) {
        {
          return (selectedFields.selectedCustomerNames.indexOf(item['customerName']) > -1)
            && (item['orderDate'] >= this.selectedFromDate) &&
            (item['orderDate'] <= this.selectedToDate)

        }
      }

      ///customerName && OrderDateFrom && orderAmountFrom
      if ((selectedFields.selectedCustomerNames && this.selectedFromDate && selectedFields.selectedFromAmount) &&
        (selectedFields.selectedToDate == null && selectedFields.selectedToAmount == null && selectedFields.selectedShippers == null)) {
        {
          return (selectedFields.selectedCustomerNames.indexOf(item['customerName']) > -1)
            && (item['orderDate'] >= this.selectedFromDate) &&
            (item['orderTotal'] >= selectedFields.selectedFromAmount)

        }
      }

      ///customerName && OrderDateFrom && orderAmountTo
      if ((selectedFields.selectedCustomerNames && this.selectedFromDate && selectedFields.selectedToAmount) &&
        (selectedFields.selectedToDate == null && selectedFields.selectedFromAmount == null && selectedFields.selectedShippers == null)) {
        {
          return (selectedFields.selectedCustomerNames.indexOf(item['customerName']) > -1)
            && (item['orderDate'] >= this.selectedFromDate) &&
            (item['orderTotal'] <= selectedFields.selectedToAmount)

        }
      }

      /////customerName && OrderDateFrom && orderDateTo && orderTotalFrom
      if ((selectedFields.selectedCustomerNames && this.selectedFromDate && this.selectedToDate && selectedFields.selectedFromAmount) &&
        (selectedFields.selectedToAmount == null && selectedFields.selectedShippers == null)) {
        {
          return (selectedFields.selectedCustomerNames.indexOf(item['customerName']) > -1)
            && (item['orderDate'] >= this.selectedFromDate) &&
            (item['orderDate'] <= this.selectedToDate) &&
            (item['orderTotal'] >= selectedFields.selectedFromAmount)

        }
      }

      //customerName && OrderDateFrom && orderDateTo && orderTotalTo
      if ((selectedFields.selectedCustomerNames && this.selectedFromDate && this.selectedToDate && selectedFields.selectedToAmount) &&
        (selectedFields.selectedFromAmount == null && selectedFields.selectedShippers == null)) {
        {
          return (selectedFields.selectedCustomerNames.indexOf(item['customerName']) > -1)
            && (item['orderDate'] >= this.selectedFromDate) &&
            (item['orderDate'] <= this.selectedToDate) &&
            (item['orderTotal'] <= selectedFields.selectedToAmount)

        }
      }
      ////5 fileds
      if ((selectedFields.selectedCustomerNames && this.selectedFromDate && this.selectedToDate && selectedFields.selectedToAmount && selectedFields.selectedFromAmount)
        && (selectedFields.selectedShippers == null)) {
        return (selectedFields.selectedCustomerNames.indexOf(item['customerName']) > -1)
          && (item['orderDate'] >= this.selectedFromDate)
          && (item['orderDate'] <= this.selectedToDate)
          && (item['orderTotal'] >= selectedFields.selectedFromAmount)
          && (item['orderTotal'] <= selectedFields.selectedToAmount)

      }

      //orderfromdate && orderToDate
      if ((this.selectedFromDate && this.selectedToDate) &&
        (selectedFields.selectedShippers == null && selectedFields.selectedCustomerNames == null && selectedFields.selectedFromAmount == null && selectedFields.selectedToAmount == null)) {
        return (item['orderDate'] >= this.selectedFromDate)
          && (item['orderDate'] <= this.selectedToDate)
      }
      //orderFromDate && orderFromAmount 
      if ((this.selectedFromDate && selectedFields.selectedFromAmount) &&
        (selectedFields.selectedShippers == null && selectedFields.selectedCustomerNames == null && selectedFields.selectedToDate == null && selectedFields.selectedToAmount == null)) {
        return (item['orderDate'] >= this.selectedFromDate) && (item['orderTotal'] >= selectedFields.selectedFromAmount)
      }
      //orderFromDate && orderToAmount 
      if ((this.selectedFromDate && selectedFields.selectedToAmount) &&
        (selectedFields.selectedShippers == null && selectedFields.selectedCustomerNames == null && selectedFields.selectedToDate == null && selectedFields.selectedFromAmount == null)) {
        return (item['orderDate'] >= this.selectedFromDate) && (item['orderTotal'] <= selectedFields.selectedToAmount)
      }
      //orderfromdate && orderToDate && orderFromAmount
      if ((this.selectedFromDate && this.selectedToDate && selectedFields.selectedFromAmount) &&
        (selectedFields.selectedShippers == null && selectedFields.selectedCustomerNames == null && selectedFields.selectedToAmount == null)) {
        return (item['orderDate'] >= this.selectedFromDate)
          && (item['orderDate'] <= this.selectedToDate) &&
          (item['orderTotal'] >= selectedFields.selectedFromAmount)
      }
      //  //orderfromdate && orderToDate && orderToAmount
      if ((this.selectedFromDate && this.selectedToDate && selectedFields.selectedToAmount) &&
        (selectedFields.selectedShippers == null && selectedFields.selectedCustomerNames == null && selectedFields.selectedFromAmount == null)) {
        return (item['orderDate'] >= this.selectedFromDate)
          && (item['orderDate'] <= this.selectedToDate) &&
          (item['orderTotal'] <= selectedFields.selectedToAmount)
      }

      //4Fields
      if ((this.selectedFromDate && this.selectedToDate && selectedFields.selectedFromAmount && selectedFields.selectedToAmount) &&
        (selectedFields.selectedShippers == null && selectedFields.selectedCustomerNames == null)) {
        return (item['orderDate'] >= this.selectedFromDate)
          && (item['orderDate'] <= this.selectedToDate) &&
          (item['orderTotal'] >= selectedFields.selectedFromAmount) &&
          (item['orderTotal'] <= selectedFields.selectedToAmount)
      }
      //orderToDate && orderFromAmount 
      if ((this.selectedToDate && selectedFields.selectedFromAmount) &&
        (selectedFields.selectedShippers == null && selectedFields.selectedCustomerNames == null && selectedFields.selectedFromDate == null && selectedFields.selectedToAmount == null)) {
        return (item['orderDate'] <= this.selectedToDate) && (item['orderTotal'] >= selectedFields.selectedFromAmount)
      }
      //orderToDate && orderToAmount 
      if ((this.selectedToDate && selectedFields.selectedToAmount) &&
        (selectedFields.selectedShippers == null && selectedFields.selectedCustomerNames == null && selectedFields.selectedFromDate == null && selectedFields.selectedFromAmount == null)) {
        return (item['orderDate'] <= this.selectedToDate) && (item['orderTotal'] <= selectedFields.selectedToAmount)
      }
      //orderToDate && orderFromAmount  && orderToAmount
      if ((this.selectedToDate && selectedFields.selectedFromAmount && selectedFields.selectedToAmount) &&
        (selectedFields.selectedShippers == null && selectedFields.selectedCustomerNames == null && selectedFields.selectedFromDate == null)) {

        return (item['orderDate'] <= this.selectedToDate) && (item['orderTotal'] >= selectedFields.selectedFromAmount) && (item['orderTotal'] <= selectedFields.selectedToAmount)
      }
      // orderFromAmount  && orderToAmount
      if ((selectedFields.selectedFromAmount && selectedFields.selectedToAmount) &&
        (selectedFields.selectedToDate == null && selectedFields.selectedShippers == null && selectedFields.selectedCustomerNames == null && selectedFields.selectedFromDate == null)) {

        return (item['orderTotal'] >= selectedFields.selectedFromAmount) && (item['orderTotal'] <= selectedFields.selectedToAmount)
      }
    })
    //transform
  }
  //class
}
