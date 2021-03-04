import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Product } from "../model/product.model";

@Injectable({providedIn:"root"})
export class ProductService{
    constructor(private http : HttpClient){
    }
    getAllProducts() :Observable<Product[]>{
        let host = environment.host;
        console.log("i call the service function and this is the url" + host);
        return this.http.get<Product[]>(host+"/products");
    }

    getSelectedProducts() :Observable<Product[]>{
        let host = environment.host;
        return this.http.get<Product[]>(host+"/products?selected=true");
    }
    getAvailableProducts() :Observable<Product[]>{
        let host = environment.host;
        return this.http.get<Product[]>(host+"/products?available=true");
    }

    SearchProducts(keyword : string):Observable<Product[]>{
        let host = environment.host;
        return this.http.get<Product[]>(host+"/products?name_like="+keyword);
    }

    SelectProducts(product : Product):Observable<Product>{
        let host = environment.host;
        product.selected = !product.selected;
        return this.http.put<Product>(host+"/products/"+product.id,product);
    }

    DeleteProduct(product : Product):Observable<void>{
        let host = environment.host;
        product.selected = !product.selected;
        return this.http.delete<void>(host+"/products/"+product.id);
    }

}