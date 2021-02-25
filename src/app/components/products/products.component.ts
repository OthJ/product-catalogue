import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products:Product[]|null=null;

  constructor(private productService: ProductService) { 

  }

  onGetAllProducts(){
    this.productService.getAllProducts().subscribe(data=>{
      this.products = data;
    });
  }
  ngOnInit(): void {
  }

}
