export enum Mood {
  VeryBad = 0,
  Bad = 1,
  Neutral = 2,
  Good = 3,
  VeryGood = 4,
  Excellent = 5,
  Amazing = 6
}

export interface JournalEntry {
  id?: number;
  userId: string;
  date: string;
  moodRating: Mood;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateJournalEntry {
  userId: string;
  date: string;
  moodRating: Mood;
  description: string;
}
