import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@auth/services/auth.services';

@Component({
  selector: 'register-page',
  imports: [ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  fb = inject(FormBuilder);
  hasError = signal(false);
  registerOk = signal(false);
  isPosting = signal(false);
  router = inject(Router);
  mensaje = signal('');
  successMessage = signal('Verifique datos');

  authService = inject(AuthService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    fullName: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.hasError.set(true);
      // this.retornarError();
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }
    const { email = '', password = '', fullName = '' } = this.loginForm.value;
    this.authService.register(email!, password!, fullName!).subscribe((resp) => {
      if (resp.ok) {
        this.successMessage.set('Por favor, revise la información. Prueba');
        this.registerOk.set(true); // activa la alerta de éxito
        setTimeout(() => {
          this.registerOk.set(false);
          this.router.navigateByUrl('/auth/login'); // opcional: redirigir al login
        }, 5000);
      } else {
        this.successMessage.set('Correo ya registrado, verifique por favor');
        this.hasError.set(true); // activa la alerta de error
        setTimeout(() => this.hasError.set(false), 3000);
      }
    });
  }
}
