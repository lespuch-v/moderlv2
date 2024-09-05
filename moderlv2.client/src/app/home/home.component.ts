import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  chartImage: string = '../assets/images/chart-image.webp'
  marketingImage: string = '../assets/images/marketing-image.webp'
  infoVizImage: string = '../assets/images/info-visualization.png'
  coffeeImage: string = '../assets/images/coffe1.png'

}
