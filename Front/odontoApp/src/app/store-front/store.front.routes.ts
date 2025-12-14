import { Routes } from '@angular/router';
import { StoreFrontLayoutComponent } from './layouts/store-front-layout.component/store-front-layout.component';
import { HomePageComponent } from './pages/home-page.component/home-page.component';
import { GenderPageComponent } from './pages/gender-page.component/gender-page.component';
import { NotFoundPageComponent } from './pages/not-found-page.component/not-found-page.component';
import { ProductPageComponent } from './pages/product-page.component/product-page.component';

export const storeFrontRutes: Routes = [
  {
    path: '',
    component: StoreFrontLayoutComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
      {
        path: 'gender/:gender',
        component: GenderPageComponent,
      },
      {
        path: 'product/:idSlug',
        component: ProductPageComponent,
      },
      {
        path: '**',
        component: NotFoundPageComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export default storeFrontRutes;
