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

const welcomeMessages: string[] = [
  'How are you feeling today? 😊',
  'Hello! Every emotion matters. 🌟',
  'Greetings! 😊',
  'Take a moment to log your mood. 💪',
  'Hi! Your mood is important. 🌈',
  'Welcome! Reflect on how you’re doing. 💬',
  'Let’s capture today’s mood. 😊',
  'Tracking your emotions brings clarity. 💖',
  'You’re doing great! How’s your mood? 🌿',
  'Welcome! Record today’s mood. 🌞',
  'New day, new feelings. 💭'
];

const getRandomMessage = (messages: string[]): string => {
  return messages[Math.floor(Math.random() * messages.length)];
}

const getRandomWelcomeMessage = (welcomeMessages: string[]): string => {
  return welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
}

export const randomMessage = getRandomMessage(messages);
export  const randomWelcomeMessage = getRandomWelcomeMessage(welcomeMessages);
