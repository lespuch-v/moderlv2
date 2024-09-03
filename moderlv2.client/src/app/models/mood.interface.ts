// Enum for runtime values
export enum MoodEnum {
  Happy = 1,
  Sad = 2,
  Angry = 3,
  Anxious = 4,
  Excited = 5,
  Relaxed = 6,
  Neutral = 7
}

// Interface for type checking
export interface Mood {
  Happy: 1;
  Sad: 2;
  Angry: 3;
  Anxious: 4;
  Excited: 5;
  Relaxed: 6;
  Neutral: 7;
}

export const MoodEmoji: Record<keyof Mood, string> = {
  Happy: '😊',
  Sad: '😢',
  Angry: '😠',
  Anxious: '😰',
  Excited: '😁',
  Relaxed: '😌',
  Neutral: '😐'
};

export interface MoodOption {
  key: MoodKey;
  emoji: string;
  swapEmoji: string;
  tooltip: string;
}


export type MoodKey = keyof Mood;
export type MoodValue = MoodEnum;

// Allow for undefined mood (not selected)
export type MoodSelection = MoodValue | undefined;

// Helper function to get mood name from value
export function getMoodName(value: MoodValue): MoodKey | undefined {
  return MoodEnum[value] as MoodKey | undefined;
}

// Helper function to get mood value from name
export function getMoodValue(name: MoodKey): MoodValue {
  return MoodEnum[name];
}
