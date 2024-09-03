import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  MoodKey,
  MoodSelection,
  MoodEmoji,
  MoodEnum,
  getMoodValue,
  MoodOption, getMoodName
} from './../models/mood.interface';

@Component({
  selector: 'stat-journal-current-mood',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './stat-journal-current-mood.component.html',
  styleUrl: './stat-journal-current-mood.component.css'
})
export class StatJournalCurrentMoodComponent {
  @Input() currentMood: MoodSelection | undefined;

  getMoodEmoji(moodValue: MoodEnum | undefined) {
    if(moodValue === undefined) {
      return '❓';
    }
    const moodName = getMoodName(moodValue);
    return moodName ? MoodEmoji[moodName] : '❓';
  }
}
