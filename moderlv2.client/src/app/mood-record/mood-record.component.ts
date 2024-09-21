import { CreateJournalEntry, JournalEntry, Mood } from '../models/JournalEntry';
import {
  MoodKey,
  MoodSelection,
  MoodEmoji,
  MoodEnum,
  getMoodValue,
  MoodOption,
  getMoodName,
} from './../models/mood.interface';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { StatJournalCounterComponent } from '../stat-journal-counter/stat-journal-counter.component';
import { StatJournalCurrentMoodComponent } from '../stat-journal-current-mood/stat-journal-current-mood.component';
import {
  StatJournalCurrentStreakComponent
} from '../stat-journal-current-streak/stat-journal-current-streak.component';
import { StatJournalWordCountComponent } from '../stat-journal-word-count/stat-journal-word-count.component';
import { StatJournalMoodForecastComponent } from '../stat-journal-mood-forecast/stat-journal-mood-forecast.component';
import { CommonModule } from '@angular/common';
import { randomMessage } from '../utility/random-messages';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MoodServiceService } from '../services/mood-service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-mood-record',
  standalone: true,
  imports: [BaseChartDirective, StatJournalCounterComponent, StatJournalCurrentMoodComponent, StatJournalCurrentStreakComponent, StatJournalWordCountComponent, StatJournalMoodForecastComponent, CommonModule, FormsModule],
  templateUrl: './mood-record.component.html',
  styleUrl: './mood-record.component.css'
})
export class MoodRecordComponent implements OnInit {

  MoodEnum = MoodEnum;
  MoodEmoji = MoodEmoji;
  textAreaMessage: string | undefined = '';
  selectedMood: MoodSelection = undefined;
  showMoodErrorMsg: boolean = false;
  isEditModeActive: boolean = false;
  journalMoodText: string = '';
  editingEntryId: number | null = null;
  editingMood: MoodSelection = undefined;
  journalWordCount: number = 0;

  allCurrentJournalEntries: JournalEntry[] = [];

  moodOptions: MoodOption[] = [
    { key: 'Happy', emoji: '😊', swapEmoji: '😄', tooltip: 'Content / Joyful' },
    { key: 'Sad', emoji: '😢', swapEmoji: '😞', tooltip: 'Unhappy / Gloomy' },
    { key: 'Angry', emoji: '😠', swapEmoji: '😡', tooltip: 'Frustrated / Furious' },
    { key: 'Anxious', emoji: '😰', swapEmoji: '😨', tooltip: 'Anxious / Worried' },
    { key: 'Excited', emoji: '🤩', swapEmoji: '😃', tooltip: 'Excited / Thrilled' },
    { key: 'Relaxed', emoji: '😌', swapEmoji: '🧘', tooltip: 'Relaxed / Calm' },
    { key: 'Neutral', emoji: '😐', swapEmoji: '😶', tooltip: 'Good / Neutral' },
  ];

  moodMap = {
    1: { label: 'Happy', value: 6 },
    2: { label: 'Sad', value: 2 },
    3: { label: 'Angry', value: 1 },
    4: { label: 'Anxious', value: 3 },
    5: { label: 'Excited', value: 7 },
    6: { label: 'Relaxed', value: 5 },
    7: { label: 'Neutral', value: 4 }
  };

  lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Mood',
        tension: 0.3,
        fill: true,
        borderColor: '#FFC107',
        backgroundColor: '#FFF9C4',
        pointBackgroundColor: '#FFEB3B',
        pointBorderColor: '#FF5722',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'blue'
      },
    ],
    labels: []
  };

  lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    aspectRatio: 2,
    scales: {
      y: {
        beginAtZero: true,
        max: 7,
        ticks: {
          stepSize: 1,
          callback: (value) => {
            return Object.values(this.moodMap).find(m => m.value === value)?.label || '';
          }
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw as number;
            const mood = Object.values(this.moodMap).find(m => m.value === value);
            return mood ? mood.label : '';
          }
        }
      }
    }
  };

  lineChartType: ChartType = 'line';

  constructor(private moodService: MoodServiceService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.textAreaMessage = randomMessage;
    this.getAllJournalEntries();
  }

  getAllJournalEntries() {
    const token = localStorage.getItem('token');

    this.moodService.getJournalEntries().subscribe({
      next: (result) => {
        this.allCurrentJournalEntries = [...result].reverse();
        this.getJournalEntryCount();
        this.updateChartData(this.allCurrentJournalEntries)
      },
      error: (error) => {
        console.error('Error fetching journal entries:', error);
        if (error.status === 401) {
          console.log('Unauthorized, redirecting to login');
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      }
    });
  }

  emojiSelection(mood: MoodKey): void {
    this.showMoodErrorMsg = false;
    this.selectedMood = this.selectedMood === getMoodValue(mood) ? undefined : getMoodValue(mood);
  }

  updateChartData(entries: JournalEntry[]) {
    // entries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const moodRatings = entries.map(entry => this.moodMap[entry.moodRating as keyof typeof this.moodMap].value);
    const dates = entries.map(entry => new Date(entry.date).toLocaleDateString());

    this.lineChartData.datasets[0].data = moodRatings;
    this.lineChartData.labels = dates;

    this.lineChartData = { ...this.lineChartData };
  }

  editJournalEntry(entryId: number | undefined): void {
    if (typeof entryId === 'number') {
      this.editingEntryId = entryId;
      const entry = this.allCurrentJournalEntries.find(e => e.id === entryId);
      if (entry) {
        this.editingMood = entry.moodRating as unknown as MoodSelection;
      }
    } else {
      console.error('Attempted to edit entry with undefined id');
    }
  }

  handleSubmit(): void {
    if (!this.journalMoodText || this.selectedMood === undefined) {
      this.showMoodErrorMsg = true;
      return;
    }

    const newJournalEntry: CreateJournalEntry = {
      userId: 'my-user-test',
      description: this.journalMoodText,
      moodRating: this.selectedMood as unknown as Mood,
      date: new Date().toISOString(),
    }

    this.moodService.addNewJournalEntry(newJournalEntry).subscribe({
      next: (result: JournalEntry) => {
        this.getAllJournalEntries();
        this.resetForm();
      }
    })
  }

  deleteJournalEntry(journalEntryId: any) {
    this.moodService.deleteJournalEntry(journalEntryId).subscribe({
      next: (result) => {
        this.isEditModeActive = false;
        this.getAllJournalEntries();
      }
    })
  }

  getEmojiEnum(moodValue: number) {
    const moodName = getMoodName(moodValue)
    return moodName ? MoodEmoji[moodName] : '⭐';
  }

  saveJournalEntry(entry: JournalEntry): void {
    if (entry && entry.id !== undefined) {
      const updatedEntry = { ...entry, moodRating: this.editingMood as unknown as Mood };
      this.moodService.updateJournalEntry(updatedEntry).subscribe({
        next: () => {
          const index = this.allCurrentJournalEntries.findIndex(e => e.id === entry.id);
          if (index !== -1) {
            this.allCurrentJournalEntries[index] = { ...entry, moodRating: this.editingMood as unknown as Mood };
          }
          this.editingEntryId = null;
          this.editingMood = undefined;
          this.getAllJournalEntries();
        },
        error: (error) => {
          console.error('Error updating journal entry:', error);
        }
      });
    } else {
      console.error('Cannot save entry with undefined id:', entry);
    }
  }

  cancelEdit(): void {
    this.editingEntryId = null;
    this.editingMood = undefined;
  }

  emojiSelectionEdit(mood: MoodKey): void {
    this.editingMood = getMoodValue(mood);
  }

  resetForm() {
    this.journalMoodText = '';
    this.selectedMood = undefined;
    this.showMoodErrorMsg = false;
  }

  getJournalEntryCount() {
    this.moodService.getJournalEntryCount().subscribe(result => {
      this.journalWordCount = result
    })
  }
}
