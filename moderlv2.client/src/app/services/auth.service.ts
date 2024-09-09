import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { AuthResponse, LoginRequest, LoginResponse, RegisterRequest } from '../models/auth.model';
import { ToasterService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = 'https://localhost:7081/api/Auth';


  constructor(private http: HttpClient, private router: Router) { }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginRequest).pipe(
      tap((response: LoginResponse) => {
        console.log('Login successful.');
        localStorage.setItem('token', response.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
    ToasterService.showToast('info', 'You have been successfully logged off.')
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const expiryDate = new Date(0);
        expiryDate.setUTCSeconds(decodedToken.exp);

        if (expiryDate > new Date()) {
          return true;
        } else {
          this.logout();
          this.router.navigate(['/login'], { queryParams: { sessionExpired: true } });
          return false;
        }
      } catch (error) {
        console.error('Token decoding failed', error);
        return false;
      }
    }
    return false;
  }

  registerUser(registerRequest: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, registerRequest)
      .pipe(
        catchError((error) => {
          console.error('Registration failed', error);
          return throwError(error);
        })
      );
  }

  getUserId(): string | null {
    debugger
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.nameid;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    } else {
      console.error('Token not found');
      return null;
    }
  }

}
