import { Component, Input } from '@angular/core';

@Component({
  selector: 'stat-journal-counter',
  standalone: true,
  imports: [],
  templateUrl: './stat-journal-counter.component.html',
  styleUrl: './stat-journal-counter.component.css'
})
export class StatJournalCounterComponent {
  @Input() totalEntries!: number;
  @Input() thisMonthEntries: null | undefined;

}
