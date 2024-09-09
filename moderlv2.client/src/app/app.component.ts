import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { MoodRecordComponent } from "./mood-record/mood-record.component";
import { ToasterComponent } from './toaster/toaster.component';
import { MoodServiceService } from './services/mood-service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, MoodRecordComponent, ToasterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  username: string = '';

  constructor(private moodService: MoodServiceService, private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.getUserNameToDisplay();
    }
  }

  getUserNameToDisplay() {
    this.moodService.getUserName().subscribe({
      next: (result) => {
        this.username = result
      },
      error: (error) => {
        console.error('Error fetching username:', error);
      }
    });
  }
}
