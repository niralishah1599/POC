import { Component, OnInit ,Input } from '@angular/core';
import {Iproduct} from 'src/app/models/product';
import {Location} from '@angular/common';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase } from 'angularfire2/database';

//service
import {ProductService} from 'src/app/services/product.service';
import {FilterPipe} from 'src/app/pipes/filter.pipe';
import { SideModalComponent } from 'src/app/modals/side-modal/side-modal.component';
import { CenterModalComponent } from 'src/app/modals/center-modal/center-modal.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  //createProduct: Iproduct;
  products: Iproduct[] = [];
  discount: string = "Yes";
  //add: boolean = false;
  @Input() page = 1;
  @Input() pageSize = 10;
  @Input() inputDiscount:number;
  @Input() collectionSize: number = 100;
  searchItem: string = "";
  filteredProducts = [];
  //productsData: Iproduct[] = []
  //productLength: number;
  suppliers: Iproduct[] = [];
  categories: Iproduct[] = [];
  //searchedProducts: [];
  selectedSupplier: string;
  selectedCategory: string;
 content:string="addProduct";
  constructor(public _productService: ProductService,public location:Location, public _filterPipe: FilterPipe, private angularFireDatabase: AngularFireDatabase,private modalService:NgbModal) { }

  ngOnInit() {
    this.getProducts()
  }



  getProducts() {
    this._productService.getAllData().subscribe(data => {
      this.collectionSize = data.length;
      this.products = data;
    
      this.filteredProducts = data;
      this.suppliers = this._productService.getSuppliersOrCategories(data.map(data => data['supplier']));
      this.categories = this._productService.getSuppliersOrCategories(data.map(data => data['category']));
     
    })
  }


  open(content)
  {
   console.log("in product",content);
   const modalAddRef=this.modalService.open(SideModalComponent);
   modalAddRef.componentInstance.content=content;
  }


  opencenterModal(product:Iproduct)
  {
    const modalRef=this.modalService.open(CenterModalComponent);
    modalRef.componentInstance.product=product;

  }

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
    console.log(this.products)
  }

  
  exportAsXLSX()
  {
    // let fileName="products";
    // this.excelService.downloadFile(this.products,fileName);
  }

    
  
}
