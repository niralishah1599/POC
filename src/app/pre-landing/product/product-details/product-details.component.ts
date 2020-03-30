import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

//interface
import { Iproduct } from 'src/app/models/product';


//firedatabase
import { AngularFireDatabase } from 'angularfire2/database';

//service
import { ProductService } from 'src/app/services/product.service';
import { ExcelService } from 'src/app/services/excel.service';

//component
import { SideModalComponent } from 'src/app/modals/side-modal/side-modal.component';
import { CenterModalComponent } from 'src/app/modals/center-modal/center-modal.component';

//pipe
import { FilterPipe } from 'src/app/pipes/filter.pipe';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  @Input() page = 1;
  @Input() pageSize = 10;
  @Input() collectionSize: number = 100;


  products: Iproduct[] = [];
  discount: string = "Yes";
  searchItem: string = "";
  filteredProducts = [];
  suppliers: Iproduct[] = [];
  categories: Iproduct[] = [];
  selectedSupplier: string;
  selectedCategory: string;
  content: string = "addProduct";
  showSpinner:boolean=true;
  constructor(public _productService: ProductService, public _filterPipe: FilterPipe,private modalService: NgbModal, private _excelService: ExcelService) { }

  ngOnInit() {
    this.getProducts()
  }

  //toGetProductData
  getProducts() {
    this._productService.getAllData().subscribe(data => {
      this.collectionSize = data.length;
      this.products = data;
      this.filteredProducts = data;
      this.suppliers = this._productService.getSuppliersOrCategories(data.map(data => data['supplier']));
      this.categories = this._productService.getSuppliersOrCategories(data.map(data => data['category']));
      this.showSpinner=false;
    })
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
    this.products = this._filterPipe.transform(this.filteredProducts, this.searchItem, this.selectedSupplier, this.selectedCategory);
    this.collectionSize = this.products.length

  }

  //exportingDataToExcel
  exportToExcel() {
    let fileName = 'products.csv';
    let columnNames = ["productId", "Product Name", "Supplier", "Category", "Price", "discounted", "discount"];
    this._excelService.exportToExcel(fileName, columnNames, this.products.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize))
  }

}
