import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth/services/auth.services';

@Component({
  selector: 'front-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './front-navbar.component.html',
  styleUrl: './front-navbar.component.css',
})
export class FrontNavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    $event.returnValue = '¿Seguro que quieres salir de la página?';
  }
  
  logout() {
    const confirmLogout = confirm('¿Seguro que quieres cerrar sesión y salir de la página?');
    if (!confirmLogout) return;
    this.authService.logout();
    this.router.navigateByUrl('/auth/login'); //  redirige al login
  }

}
