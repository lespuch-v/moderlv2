const messages: string[] = [
  'How\'s your mood today?',
  'Feeling...',
  'Today\'s vibe...',
  'My mood in words...',
  'Express yourself here...',
  'Mood check...',
  'Thoughts and feelings...',
  'How\'s your heart?',
  'Today\'s mood color...',
  'Mood in words...',
  'Emotional weather report...',
  'Current state of mind...',
  'What\'s on your mind?',
  'Mood snapshot...',
  'How are you feeling right now?',
  'Describe your day in one word...',
  'Your emotional temperature...',
  'Mood meter reading...',
  'Share your current mood...',
  'What\'s your emotional forecast?'
]

const getRandomMessage = (messages: string[]): string => {
  return messages[Math.floor(Math.random() * messages.length)];
}

export const randomMessage = getRandomMessage(messages);
