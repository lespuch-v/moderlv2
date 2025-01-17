import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToasterService } from '../services/toast.service';
import { RegisterRequest } from '../models/auth.model';

@Component({
  selector: 'app-registration-modal',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './registration-modal.component.html',
  styleUrl: './registration-modal.component.css'
})
export class RegistrationModalComponent {

  @ViewChild('modalRegistrationContainer') modalRegistrationContainer!: ElementRef;
  isRegistrationModalOpen: boolean = false;
  userName: string = '';
  userEmail: string = '';
  userPassword: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService) { }

  onRegister() {
    console.log('Registration submitted...');

    const userData: RegisterRequest  = {
      email: this.userEmail,
      password: this.userPassword,
      username: this.userName
    };

    this.authService.registerUser(userData).subscribe({
      next: () => {
        ToasterService.showToast('success', 'Registration success!')
        ToasterService.showToast('info', 'Try log in.', 5000)
      },
      error: (error) => {
        console.error('Registration failed:', error);
      },
      complete: () => {
        this.closeModal();
      }
    });
  }

  closeModal(): void {
    this.isRegistrationModalOpen = false;
  }

  openRegistrationModel(): void {
    this.isRegistrationModalOpen = true;

    setTimeout(() => {
      if (this.modalRegistrationContainer) {
        this.modalRegistrationContainer.nativeElement.focus();
      }
    }, 0);
  }


  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isRegistrationModalOpen) {
      this.closeModal();
    }
  }
}
