import { Component, OnInit, Input } from '@angular/core';
//validator
import { FormBuilder, Validators } from '@angular/forms';
//interface
import { Iproduct } from 'src/app/models/product';
//service
import { ProductService } from 'src/app/services/product.service';
//database
import { AngularFireDatabase } from 'angularfire2/database';
//modal
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})

export class AddEditProductComponent implements OnInit {

  constructor(private _productService: ProductService, private fb: FormBuilder, private angularFireDatabase: AngularFireDatabase, public activeModal: NgbActiveModal) { }

  @Input() public editProduct: Iproduct;

  productLength: number;
  suppliers: Iproduct;
  categories: Iproduct;
  data: Iproduct;
  productId: number;
  showDiscount: boolean = true;
  id: number;

  productForm = this.fb.group({
    name: ["", Validators.required],
    supplier: ["", Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    category: ["", Validators.required],
    discounted: ["", Validators.required],
    discount: [, [Validators.min(0)]]
    
  })
  ngOnInit() {
    this.getProducts();

    if (this.editProduct) {

      this.productForm.patchValue({
        id: this.editProduct.id,
        name: this.editProduct.name,
        supplier: this.editProduct.supplier,
        category: this.editProduct.category,
        price: this.editProduct.price,
        discounted: this.editProduct.discounted,
        discount: this.editProduct.discount
      })
      if (this.editProduct.discounted == 'No') {
        this.showDiscount = false
      }

    }
    else {
      this.showDiscount = false;
    }

  }

  //toGetProductData
  getProducts() {
    this._productService.getAllData().subscribe(data => {
      this.productLength = data.length
      this.suppliers = this._productService.getSuppliersOrCategories(data.map(data => data['supplier']));
      this.categories = this._productService.getSuppliersOrCategories(data.map(data => data['category']))

    })
  }


  //forDiscount
  isShowDiscount(event) {
    console.log(event.target.value);
    if (event.target.value == 'Yes') {
      this.showDiscount = true
    }
    else {
      this.showDiscount = false
      this.productForm.patchValue({
        name: this.productForm.controls['name'].value,
        supplier: this.productForm.controls['supplier'].value,
        category: this.productForm.controls['category'].value,
        price: this.productForm.controls['price'].value,
        discount: 0,
        discounted: this.productForm.controls['discounted'].value,
      })
    }
  }

  //toSubmitProductData
  onSubmit() {

    if (this.editProduct) {
      let data = {
        id: this.editProduct.id,
        name: this.productForm.controls['name'].value,
        supplier: this.productForm.controls['supplier'].value,
        category: this.productForm.controls['category'].value,
        price: this.productForm.controls['price'].value,
        discount: this.productForm.controls['discount'].value,
        discounted: this.productForm.controls['discounted'].value,
      }
      this.activeModal.close();
      this._productService.updateProduct(data);


    }
    else {
      let sub = this.angularFireDatabase.list('/products').valueChanges().subscribe(prodcuts => {
        this.data = {
          id: prodcuts.length + 1,
          name: this.productForm.controls['name'].value,
          supplier: this.productForm.controls['supplier'].value,
          category: this.productForm.controls['category'].value,
          discounted: this.productForm.controls['discounted'].value,
          price: this.productForm.controls['price'].value,
          discount: this.productForm.controls['discount'].value,
        }
        this._productService.addProduct(this.data);
        sub.unsubscribe();
        this.activeModal.close();
      })
    }

  }
}


