import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Input()
  productsInput$:Observable<AppDataState<Product[]>>|null = null;

  @Output() productEventEmitter : EventEmitter<ActionEvent> = new EventEmitter();
  readonly DataStateEnum = DataStateEnum;


  constructor() { }


  onSelect(p:Product){
    this.productEventEmitter.emit({type : ProductActionsTypes.SELECT_PRODUCT,payload : p});
  }

  onDelete(p:Product){
    this.productEventEmitter.emit({type : ProductActionsTypes.DELETE_PRODUCT,payload : p});
  }

  onUpdate(p: Product){
    this.productEventEmitter.emit({type : ProductActionsTypes.EDIT_PRODUCT,payload : p});
}

  ngOnInit(): void {
  }

}
