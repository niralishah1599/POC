import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// interface
import { Iproduct } from 'src/app/models/product';


// service
import { ProductService } from 'src/app/services/product.service';
import { ExcelService } from 'src/app/services/excel.service';

// component
import { SideModalComponent } from 'src/app/modals/side-modal/side-modal.component';
import { CenterModalComponent } from 'src/app/modals/center-modal/center-modal.component';

//pipe
import { ProductSearchPipe } from 'src/app/core/pipes/product-search.pipe';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  @Input() page = 1;
  @Input() pageSize = 10;
  @Input() collectionSize = 100;

  order: string = 'decending';
  products: Iproduct[] = [];
  discount: string = "Yes";
  searchItem: string = "";
  filteredProducts = [];
  suppliers: Iproduct[] = [];
  categories: Iproduct[] = [];
  selectedSupplier: string;
  selectedCategory: string;
  content = 'addProduct';
  showSpinner = true;
  minNum = 1;
  maxNum = 50;
  sortClass = {
    name: 'down',
    supplier: 'down',
    category: 'down',
    price: 'down'
  }

  constructor(private _productService: ProductService, private productSearchPipe: ProductSearchPipe, private modalService: NgbModal, private _excelService: ExcelService) { }

  ngOnInit() {
    this.getProducts();
  }

  //toGetProductData
  getProducts() {
    this._productService.getAllData().subscribe(data => {
      this.collectionSize = data.length;
      this.products = data;
      this.filteredProducts = data;
      this.suppliers = this._productService.getSuppliersOrCategories(data.map(data => data['supplier']));
      this.categories = this._productService.getSuppliersOrCategories(data.map(data => data['category']));
      this.showSpinner = false;
    })
  }

  //performSortingOnField 
  sortBy(key) {

    if (this.order == 'decending' && this.sortClass[key] == 'down') {
      this._productService.sortBy(key).subscribe(data => {
        this.products = data
      })
      this.order = "ascending";
      this.sortClass[key] = 'up';
    }
    else {
      this._productService.sortBy(key).subscribe(data => {
        this.products = data.reverse()
      })
      this.order = 'decending';
      this.sortClass[key] = 'down';
    }
  }



  //toOpenSideModelForNewProduct
  openSideModal(content) {
    const modalAddRef = this.modalService.open(SideModalComponent);
    modalAddRef.componentInstance.content = content;
  }

  //toOpenCenterModelForEditProduct
  openCenterModal(product: Iproduct) {
    const modalRef = this.modalService.open(CenterModalComponent);
    modalRef.componentInstance.product = product;

  }

  //toGetProductDataFromFilter
  filterProduct(event, property?) {
    if (property == 'supplier') {
      this.selectedSupplier = event.target.value
      if (this.selectedSupplier == 'Supplier') {
        this.selectedSupplier = '';
      }

    }
    if (property == 'category') {
      this.selectedCategory = event.target.value
      if (this.selectedCategory == 'Category') {
        this.selectedCategory = '';
      }
    }
    this.products = this.productSearchPipe.transform(this.filteredProducts, this.searchItem, this.selectedSupplier, this.selectedCategory);
    this.collectionSize = this.products.length

  }

  //change discount 
  chnageDiscount(obj) {
    this._productService.updateProduct(obj);
  }

  //exportingDataToExcel
  exportToExcel() {
    let fileName = 'products.csv';
    let columnNames = ["productId", "Product Name", "Supplier", "Category", "Price", "discounted", "discount"];
    this._excelService.exportToExcel(fileName, columnNames, this.products.slice((this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize));
  }

}
