import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { map } from 'rxjs';
import { ProductCardComponent } from "@products/components/product-card.component/product-card.component";

@Component({
  selector: 'app-gender-page.component',
  imports: [ProductCardComponent],
  templateUrl: './gender-page.component.html',
  styleUrl: './gender-page.component.css',
})
export class GenderPageComponent {
  route = inject(ActivatedRoute);
  productService = inject(ProductsService);

  gender = toSignal(this.route.params.pipe(map(({ gender }) => gender)));

  productResource= rxResource({
    params:()=> ({gender:this.gender()}),
    stream:({params})=>{
      return this.productService.getProducts({
        gender : params.gender
      })
    }
  })

}
