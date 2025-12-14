import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { Product } from '@products/interfaces/product.interface';
import { rxResource } from '@angular/core/rxjs-interop'; // ✅ este es el correcto
import { ProductCarouselComponent } from '@products/components/product-carousel.component/product-carousel.component';

@Component({
  selector: 'app-product-page.component',
  imports: [ProductCarouselComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent {
  activatedRoute = inject(ActivatedRoute);
  productService = inject(ProductsService);

  productIdSlug = this.activatedRoute.snapshot.params['idSlug'];

  productResource = rxResource({
    params: () => ({ idSlug: this.productIdSlug }),
    stream: ({ params }) => {
      return this.productService.getProductByIdSlug(params.idSlug)
    }
  });
}
