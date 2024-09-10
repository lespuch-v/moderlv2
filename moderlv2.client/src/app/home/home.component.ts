import { Component, ElementRef, HostListener, ViewChild, viewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RegistrationModalComponent } from '../registration-modal/registration-modal.component';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  imports: [RouterLink, RegistrationModalComponent, LoginModalComponent, FooterComponent]
})
export class HomeComponent {

  @ViewChild('LoginModal') LoginModal!: LoginModalComponent;

  chartImage: string = '../assets/images/chart-image.webp'
  marketingImage: string = '../assets/images/marketing-image.webp'
  infoVizImage: string = '../assets/images/info-visualization.png'
  coffeeImage: string = '../assets/images/coffe1.png'

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.pageYOffset;

    const parallaxElement = document.getElementById('parallax');
    if (parallaxElement) {
      parallaxElement.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
  }

  constructor(private router: Router, private authService: AuthService) { }

  handleJournalNow() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/mood']);
    } else {
      if (this.LoginModal) {
        this.scrollToTop();
        this.LoginModal.openModal();
      } else {
        console.error('LoginModal not available');
      }
    }
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  handleButtonClick() {
    console.log('test');

  }
}
