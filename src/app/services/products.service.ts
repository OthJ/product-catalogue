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
        return this.http.get<Product[]>(environment+"/products?selected=true");
    }
    getAvailableProducts() :Observable<Product[]>{
        let host = environment.host;
        return this.http.get<Product[]>(environment+"/products?available=true");
    }

}