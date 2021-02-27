import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/products.service';
import {AppDataState, DataStateEnum} from 'src/app/state/product.state'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$:Observable<AppDataState<Product[]>>|null = null;

  constructor(private productService: ProductService) { 

  }

  onGetAllProducts(){
    this.products$ = this.productService.getAllProducts().pipe(
      map(data=>({dataStat : DataStateEnum.LOADED,data:data})),
      startWith({dataStat: DataStateEnum.LOADING}),
      catchError(err=>of({dataStat :  DataStateEnum.ERROR,errorMessage:err.message}))

    );
  }
  ngOnInit(): void {
  }

}
