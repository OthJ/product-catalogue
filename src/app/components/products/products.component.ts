import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/products.service';
import {AppDataState, DataStateEnum} from 'src/app/state/product.state'
import { map,startWith,catchError, throwIfEmpty } from 'rxjs/operators'
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  
  products$:Observable<AppDataState<Product[]>>|null = null;
  readonly DataStateEnum = DataStateEnum;

  constructor(private productService: ProductService, private router:Router) { 

  }

  onGetAllProducts(){
    this.products$ = this.productService.getAllProducts().pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))

    );
  }

  onGetSelectedProducts(){
    this.products$ = this.productService.getSelectedProducts().pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))

    );
  }

  onGetAvailableProducts(){
    this.products$ = this.productService.getAvailableProducts().pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))

    );
  }

  onSearch(dataForm : any){

    this.products$ = this.productService.SearchProducts(dataForm.keyword).pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))

    );

  }

  onSelect(p:Product){
    this.productService.SelectProducts(p)
    .subscribe(data=>{
      p.selected = data.selected;
    });

  }

  onDelete(p:Product){
    let v = confirm("you sure you want to delete this product ?");
    if(v == true)
    this.productService.DeleteProduct(p)
    .subscribe(data=>{
      this.onGetAllProducts();
    });
  }

  onNewProduct(){
      this.router.navigateByUrl("/newProduct");
  }

  onUpdate(p){
    this.router.navigateByUrl("/editProduct/"+p.id);
}
  ngOnInit(): void {
    

  }

}
