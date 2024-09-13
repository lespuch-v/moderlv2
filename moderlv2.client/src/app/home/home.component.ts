import { Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RegistrationModalComponent } from '../registration-modal/registration-modal.component';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { FooterComponent } from '../footer/footer.component';
import { EmotionsContentModalComponent } from '../emotions-content-modal/emotions-content-modal.component';
import { StatJournalGlobalCounterComponent } from "../stat-journal-global-counter/stat-journal-global-counter.component";
import { MoodServiceService } from '../services/mood-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  imports: [RouterLink, RegistrationModalComponent, LoginModalComponent, FooterComponent, EmotionsContentModalComponent, StatJournalGlobalCounterComponent]
})
export class HomeComponent implements OnInit {

  @ViewChild('LoginModal') LoginModal!: LoginModalComponent;

  chartImage: string = '../assets/images/chart-image.webp';
  marketingImage: string = '../assets/images/marketing-image.webp';
  infoVizImage: string = '../assets/images/info-visualization.png';
  coffeeImage: string = '../assets/images/coffe1.png';
  logoMooder: string = '../assets/images/book-stack.png';

  isModalVisible: boolean = false;
  modalContent: TemplateRef<any> | null = null;
  brainImage: string = '../assets/images/brainImage.png'

  @ViewChild('universalTemplate') universalTemplate!: TemplateRef<any>;
  @ViewChild('exerciseTemplate') exerciseTemplate!: TemplateRef<any>;
  @ViewChild('negativeTemplate') negativeTemplate!: TemplateRef<any>;
  @ViewChild('memoryTemplate') memoryTemplate!: TemplateRef<any>;
  @ViewChild('trackingTemplate') trackingTemplate!: TemplateRef<any>;

  communityImage: any;
  reminderImage: any;
  secureImage: any;
  totalNumberOfEntries: number = 0;
  totalNumberOfWords: number = 0;
  totalNumberOfUsers: number = 0;

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.pageYOffset;

    const parallaxElement = document.getElementById('parallax');
    if (parallaxElement) {
      parallaxElement.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
  }

  constructor(private router: Router, private authService: AuthService, private moodService: MoodServiceService) { }

  ngOnInit(): void {
    this.getTotalNumberOfEntries();
    this.getTotalWords();
    this.getTotalNumUsers();

  }

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

  handleButtonClick(contentType: string) {
    console.log(contentType);

    switch (contentType) {
      case 'cognition':
        this.modalContent = this.universalTemplate;
        break;
      case 'exercise':
        this.modalContent = this.exerciseTemplate;
        break;
      case 'music':
        this.modalContent = this.negativeTemplate;
        break;
      case 'memory':
        this.modalContent = this.memoryTemplate;
        break;
      case 'tracking':
        this.modalContent = this.trackingTemplate;
        break;
    }
    this.isModalVisible = true;
  }

  handleModalClose() {
    this.isModalVisible = false;
  }

  getTotalNumberOfEntries(): void {
    this.moodService.getTotalNumberOfEntries().subscribe((result) => {
      console.log(result);
      this.totalNumberOfEntries = result.totalEntries;
    })
  }

  getTotalWords(): void {
    this.moodService.getTotalNumberOfWords().subscribe((result) => {
      this.totalNumberOfWords = result.totalWords;
    })
  }

  getTotalNumUsers(): void {
    this.moodService.getTotalNumberOfUsers().subscribe((result) => {
      this.totalNumberOfUsers = result;
      console.log(this.totalNumberOfUsers);
    })
  }
}
