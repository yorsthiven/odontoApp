import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

import { AuthResponse } from '@auth/interface/auth-response.interface';
import { User } from '@auth/interface/user.interface';
import { Router } from '@angular/router';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router); // 👈 aquí lo inyectas

  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));

  private http = inject(HttpClient);

  checkStatusResource = rxResource({
    stream: () => this.checkStatus(),
  });

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') return 'checking';

    if (this._user()) {
      return 'authenticated';
    }

    return 'not-authenticated';
  });

  user = computed(() => this._user());
  token = computed(this._token);

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${baseUrl}/auth/login`, {
        email: email,
        password: password,
      })
      .pipe(
        map((resp) => this.handleAuthSuccess(resp)),
        catchError((error: any) => this.handleAuthError(error))
      );
  }

  register(
    email: string,
    password: string,
    fullName: string
  ): Observable<{ ok: boolean; message: string }> {
    return this.http
      .post<RegisterResponse>(`${baseUrl}/auth/register`, {
        email: email,
        password: password,
        fullName: fullName,
      })
      .pipe(
        map((resp) => {
          return this.handleRegisterOk(resp);
        }),
        catchError((error: any) => {
          return this.handleRegisterError(error);
        })
      );
  }

  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      return of(false);
    }

    return this.http
      .get<AuthResponse>(`${baseUrl}/auth/check-status`, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      .pipe(
        map((resp) => this.handleAuthSuccess(resp)),
        catchError((error: any) => this.handleAuthError(error))
      );
  }

  logout() {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('not-authenticated');
    localStorage.removeItem('token');

  }

  private handleAuthSuccess({ token, user }: AuthResponse) {
    this._user.set(user);
    this._authStatus.set('authenticated');
    this._token.set(token);
    localStorage.setItem('token', token);
    return true;
  }

  private handleAuthError(error: any) {
    this.logout();
    return of(false);
  }

  private handleRegisterOk(resp: RegisterResponse) {
    return {
      ok: true,
      message: resp.message || 'Usuario registrado correctamente',
    };
  }

  private handleRegisterError(error: any) {
    const errorMsg = error?.error?.message || 'Error desconocido';
    return of({
      ok: false,
      message: errorMsg,
    });
  }
}

interface RegisterResponse {
  message: string;
  error?: string;
  statusCode: number;
}
