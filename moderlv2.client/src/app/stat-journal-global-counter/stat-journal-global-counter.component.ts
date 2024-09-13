import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-stat-journal-global-counter',
  templateUrl: './stat-journal-global-counter.component.html',
  standalone: true,
  styleUrl: './stat-journal-global-counter.component.css'
})
export class StatJournalGlobalCounterComponent {

  @Input() entries!: number;
  @Input() numberOfWords!: number;
  @Input() numberOfUsers!: number;

}
