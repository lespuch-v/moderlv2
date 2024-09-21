import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { RegistrationModalComponent } from '../registration-modal/registration-modal.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  standalone: true,
  imports: [RegistrationModalComponent]
})
export class AboutComponent {

  constructor(public auth: AuthService, private router: Router) {}

  @ViewChild('registrationModal') registrationModal!: RegistrationModalComponent

  handleGetStarted() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['mood']);
    } else {
      this.registrationModal.openRegistrationModel();
    }
  }
}
