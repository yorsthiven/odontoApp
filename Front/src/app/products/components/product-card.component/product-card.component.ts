import { SlicePipe } from '@angular/common';
import { Product } from './../../interfaces/product.interface';
import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsResponse } from '@products/interfaces/product.interface';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';

@Component({
  selector: 'product-card',
  imports: [RouterLink, SlicePipe, ProductImagePipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {

  // producto = input.required<ProductsResponse>();

  // -------------------
  product = input.required<Product>();
}
