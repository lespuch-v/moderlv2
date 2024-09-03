import { Component } from '@angular/core';
import { DarkModeToggleComponent } from "../dark-mode-toggle/dark-mode-toggle.component";
import { RouterLink } from '@angular/router';
import { LoginModalComponent } from "../login-modal/login-modal.component";
import { RegistrationModalComponent } from '../registration-modal/registration-modal.component';
import { NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [DarkModeToggleComponent, RouterLink, LoginModalComponent, RegistrationModalComponent, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(protected authService: AuthService) {
  }

  homeImage: string = 'assets/images/home.png';
  aboutImage: string = 'assets/images/about.png';
  analyticsImage: string = 'assets/images/analytics.png';
}
