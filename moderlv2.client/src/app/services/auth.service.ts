import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../models/auth.model';  // Updated import

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = 'https://localhost:7081/api/Auth';


  constructor(private http: HttpClient, private router: Router) { }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginRequest).pipe(
      tap((response: LoginResponse) => {
        console.log('Login successful, storing token');
        localStorage.setItem('token', response.token);
        console.log('Token stored:', localStorage.getItem('token'));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
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
          return false;
        }
      } catch (error) {
        console.error('Token decoding failed', error);
        return false;
      }
    }
    return false;
  }

  registerUser(registerRequest: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, registerRequest)
      .pipe(
        catchError((error) => {
          console.error('Registration failed', error);
          return throwError(error);
        })
      );
  }

}
