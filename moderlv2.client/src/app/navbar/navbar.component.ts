import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DarkModeToggleComponent } from "../dark-mode-toggle/dark-mode-toggle.component";
import { RouterLink } from '@angular/router';
import { LoginModalComponent } from "../login-modal/login-modal.component";
import { RegistrationModalComponent } from '../registration-modal/registration-modal.component';
import { NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { UpdateUsernameModalComponent } from "../update-username-modal/update-username-modal.component";


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [DarkModeToggleComponent, RouterLink, LoginModalComponent, RegistrationModalComponent, NgIf, UpdateUsernameModalComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Input('userName') userName!: string;

  constructor(protected authService: AuthService) { }

  homeImage: string = 'assets/images/home.png';
  aboutImage: string = 'assets/images/about.png';
  analyticsImage: string = 'assets/images/analytics.png';

  onUserNameUpdated(newName: string) {
    this.userName = newName;
  }

}
