import { Component, OnInit, ViewChild } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Product } from '../../interfaces/product';
import { CurrencyPipe } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {
  MatDialog,
} from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { MatButtonModule } from '@angular/material/button';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
@Component({
  selector: 'app-product-list',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    CurrencyPipe,
    MatTableModule,
    MatIconModule,
    MatPaginator,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  displayedColumns:string[]=['id','name','price','stockQuantity','category','actions'];
  dataSource!:MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatTable) table!:MatTable<Product>;

  constructor(
    private productService:ProductService,
    private dialog:MatDialog
  ){

  }


  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts():void{
    this.productService.getProducts().subscribe(products=>{
      this.dataSource=new MatTableDataSource(products);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    });
  }

  applyFilter(event:Event):void{
    const filterValue=(event.target as HTMLInputElement).value;
    this.dataSource.filter=filterValue.trim().toLowerCase();
  }

  openDialog(product?:Product):void{
    const dialogRef=this.dialog.open(ProductDialogComponent,{
      width:'500px',
      data:product || {}
    });

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        if(result.id){
          this.productService.updateProduct(result).subscribe(()=>{
            this.loadProducts();
          });
        } else{
          this.productService.createProduct(result).subscribe(()=>{
            this.loadProducts();
          });
        }
      }
    })

  }

  deleteProduct(id:number){
    if(confirm('Are you sure you want to delete this product?')){
      this.productService.deleteProduct(id).subscribe(()=>{
        this.loadProducts();
      })
    }
  }



}
