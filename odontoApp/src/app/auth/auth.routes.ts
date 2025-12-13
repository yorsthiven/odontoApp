import { RegisterPageComponent } from './pages/register-page.component/register-page.component';

import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout.component/auth-layout.component';
import { LoginPageComponent } from './pages/login-page.component/login-page.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'register',
        component: RegisterPageComponent,
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
];

export default authRoutes;
