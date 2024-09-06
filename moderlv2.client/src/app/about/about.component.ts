import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  handleGetStarted() {
    // if user is logged in - redirect to the main mood page
    // if user is not logged in - show modal for the registrations.
  }
}
