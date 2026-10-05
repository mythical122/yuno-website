export type HiddenNote = {
  trigger: string
  message: string
}

export const hiddenNotes: HiddenNote[] = [
  { trigger: 'Tap the constellation star three times', message: 'You found this one. I still choose you.' },
  { trigger: 'Double-click a photo', message: 'You probably did not know I would hide this here. I love you.' },
  { trigger: 'Click the Yuno & Me wordmark', message: 'Okay, you are officially too curious. Keep going.' },
  { trigger: 'Press Alt + Y', message: 'Yuno, you are someone’s favorite universe.' },
  { trigger: 'Enter the anniversary as an eight-digit date', message: 'You found the date where our little universe began.' },
  { trigger: 'Tap the little star beside the timeline', message: 'One more thing: I am glad our paths crossed.' },
  { trigger: 'Tap the music record label', message: 'This song has a little room reserved for you.' },
  { trigger: 'Open the last envelope', message: 'For whatever today brings, you are loved.' },
  { trigger: 'Tap the final star in the sky', message: 'The sky is still growing. So is my list of reasons.' },
  { trigger: 'Hold the heart button for a moment', message: 'I was going to keep this short. I love you. There.' },
]

export const finalRevealLines = [
  { text: 'Yuno...', delay: 250 },
  { text: 'Out of all the people in this world...', delay: 1800 },
  { text: 'I somehow got lucky enough to find you.', delay: 3700 },
  { text: 'And if I could start this story again...', delay: 5700 },
  { text: "I'd still choose you.", delay: 7800 },
  { text: '10.04.2022  →  ∞', delay: 10100 },
]