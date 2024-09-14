import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginRequest } from '../models/auth.model';
import { AuthService } from '../services/auth.service';
import { ToasterService } from '../services/toast.service';
import { Router } from '@angular/router';
import { randomWelcomeMessage } from '../utility/random-messages';
import { MoodServiceService } from '../services/mood-service';

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

  constructor(private authService: AuthService, private router: Router, private moodService: MoodServiceService) { }

  @Output() loggedUser: EventEmitter<string> = new EventEmitter();

  openModal(): void {
    this.isLoginModalOpen = true;
  }

  closeModal(): void {
    this.isLoginModalOpen = false;
  }

  onSubmit(): void {
    this.login();
    this.closeModal();
  }

  login(): void {
    const loginRequest: LoginRequest = {
      email: this.userEmail,
      password: this.userPassword,
    }

    this.authService.login(loginRequest).subscribe((response) => {
      if (this.authService.isLoggedIn()) {
        this.loggedUser.emit(this.getUserName());
        ToasterService.showToast('success', randomWelcomeMessage)
        this.router.navigate(['/mood'])
      }
    }, (error) => {
      console.log(error);
    })
  }

  getUserName(): any {
    this.moodService.getUserName().subscribe((result) => {
      return result;
    })
  }
}
