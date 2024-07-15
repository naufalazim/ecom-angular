import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  //initialize empty array:
  products: Product[] = []
  
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    //Suscribe to get the data:
    //.suscribe(data => {this.products => data})
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

}
