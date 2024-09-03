import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginRequest } from '../models/auth.model';
import { AuthService } from '../services/auth.service';
import { ToasterService } from '../services/toast.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {
  isLoginModalOpen: boolean = false;
  userEmail: string = '';
  userPassword: string = '';

  constructor(private authService: AuthService) { }

  openModal(): void {
    this.isLoginModalOpen = true;
  }

  closeModal(): void {
    this.isLoginModalOpen = false;
    ToasterService.showToast('success', 'hello world')
  }

  onSubmit(): void {
    console.log('User email:', this.userEmail)
    console.log('User password:', this.userPassword)
    this.login();
    this.closeModal();
  }

  login(): void {
    const loginRequest: LoginRequest = {
      email: this.userEmail,
      password: this.userPassword,
    }

    this.authService.login(loginRequest).subscribe((response) => {
      console.log('Login successful', response.token);
      console.log('Token in localStorage:', localStorage.getItem('token'));
    }, (error) => {
      console.log(error);
    })
  }
}
