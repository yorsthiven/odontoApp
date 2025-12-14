import { Component, effect, inject, output, signal } from '@angular/core';
import { ProductCardComponent } from '@products/components/product-card.component/product-card.component';
import { ProductsResponse } from '@products/interfaces/product.interface';
import { ProductsService } from '@products/services/products.service';

@Component({
  selector: 'home-page',
  imports: [ProductCardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {

  productsService = inject(ProductsService);

  productsResponse = signal<ProductsResponse>({
    count:0,
    pages:0,
    products:[]
  })

  respuesta = output<ProductsResponse>;
  // output<tipoDato>();

  productsResource = effect(() => {
    this.productsService
      .getProducts({
        limit: 5,
        gender: 'women',
      })
      .subscribe((resp) => {
        this.productsResponse.set(resp);
      });
  });
}
