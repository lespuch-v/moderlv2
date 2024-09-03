import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'stat-journal-current-streak',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './stat-journal-current-streak.component.html',
  styleUrl: './stat-journal-current-streak.component.css'
})
export class StatJournalCurrentStreakComponent {
  @Input() currentStreak: string | undefined;
  isMouseOver: boolean = false;

  streakHover() {
    console.log(this.isMouseOver)
    this.isMouseOver = !this.isMouseOver;
  }
}
