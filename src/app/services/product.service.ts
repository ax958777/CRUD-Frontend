import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createProductDto, Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl='http://localhost:5244/api/products'

  constructor(private http:HttpClient) { }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl);
  }
  updateProduct(product:Product):Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/${product.id}`,product);
  }
  createProduct(product:createProductDto):Observable<Product>{
    return this.http.post<Product>(this.apiUrl,product);
  }
  deleteProduct(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
