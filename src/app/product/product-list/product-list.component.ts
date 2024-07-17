import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../models/product';
import { CartService } from '../../cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  //initialize empty array:
  products: Product[] = []
  filteredProduct: Product[] = []
  sortOrder: string = ""
  
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    //Suscribe to get the data:
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProduct = data;
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product).subscribe({
      //callback function:
      next: () => {
        this.snackbar.open("Added to cart 🍓🍓🍓", "" , {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
      }
    });
  }
 

  //search function:
  applyFilter(event: Event) : void {
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.toLocaleLowerCase();

    this.filteredProduct = this.products.filter(
      product => product.name.toLowerCase().includes(searchTerm)
    )

    this.sortProducts(this.sortOrder)
  } 


  sortProducts(sortValue: string): void {
    this.sortOrder = sortValue;
  
    if (this.sortOrder === "priceLowHigh") {
      this.filteredProduct.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === "priceHighLow") {
      this.filteredProduct.sort((a, b) => b.price - a.price);
    }
  }

}
