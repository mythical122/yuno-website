export type ReferenceContent = {
  source: string
  url: string
  verification: string
  importantMoments: string[]
  letters: string[]
  notes: string[]
  surprises: string[]
  interactions: string[]
  designIdeas: string[]
}

export const referenceContent: ReferenceContent[] = [
  {
    source: 'Yuno portfolio',
    url: 'https://mythical122.github.io/yuno-portfolio/',
    verification: 'Inspected. This is a physiotherapy portfolio for Divya Pandey, unrelated to the relationship. No personal content was reused.',
    importantMoments: [],
    letters: [],
    notes: [],
    surprises: [],
    interactions: ['Section tabs for About, Resume, Portfolio, Blog and Contact.'],
    designIdeas: ['No relationship design or personal content was appropriate to import from this unrelated site.'],
  },
  {
    source: 'Yuno',
    url: 'https://mythical122.github.io/Yuno/',
    verification: 'Inspected by browser snapshot and page-content extraction. The legacy page says 10 April 2024; Deepak confirms the actual start is 10 April 2022, which the current site uses.',
    importantMoments: ['10 April 2024 is named as the beginning.', 'The timeline offers editable prompts for a first adventure, getting through ups and downs, and a favorite evening, call or moment.', 'An ordinary day is described as becoming a favorite.'],
    letters: ['A short note is signed "Your Dee" and says the site is a little corner of the internet made just for her.'],
    notes: ['The affectionate memory names shown are Future DR, Mine Laxmi, My Lady, Yuno 3000, Bacha, Kareja, My Wife, My best Motivation, and Always You.', 'Hindi messages imagine being together in person, saying the site would not be needed if he could say it face to face, and making her the whole scene.'],
    surprises: ['A tap-my-heart interaction counts heartbeats and promises a message.', 'A final "One Last Thing" button is present; its reveal copy was not verified.'],
    interactions: ['Nine affectionate memory tabs and an album.', 'A relationship-day counter.', 'A heart button, photo album, and Spotify links.'],
    designIdeas: ['Personal nicknames attached to individual memories.', 'A timeline that mixes milestones with ordinary days.', 'Music dedications paired with specific nicknames.'],
  },
  {
    source: 'Yuno-2',
    url: 'https://mythical122.github.io/Yuno-2/',
    verification: 'The welcome screen and repeated photo strip were inspected. The post-entry letter experience was not verified.',
    importantMoments: [],
    letters: ['The entrance asks her to read the letter carefully and promises to be there for each thing; the letter itself was not available in the captured page.'],
    notes: [],
    surprises: ['A dedicated "Enter in Yuno World" welcome action.'],
    interactions: ['A photo-led repeating strip uses five personal image slots.', 'An explicit entrance button starts the experience.'],
    designIdeas: ['Make entering the private space feel intentional.', 'Use user-supplied photos as the emotional material, never random stock images.'],
  },
  {
    source: 'Yuno221030',
    url: 'https://mythical122.github.io/Yuno221030/',
    verification: 'The cover and start-music prompt were inspected. The letter after the prompt was not verified; its music file failed to load during inspection.',
    importantMoments: [],
    letters: ['The page frames the experience as a heartfelt letter for Yuno.'],
    notes: ['The opening uses the affectionate names "Fighter" and "Rani Laxmibai".'],
    surprises: ['The letter is introduced only after a user-initiated music action.'],
    interactions: ['A play-music button sets the mood before reading.', 'A local MP3 was requested but was unavailable.'],
    designIdeas: ['Let a reader choose when music accompanies a personal letter.', 'Keep music opt-in and show a graceful missing-audio state.'],
  },
  {
    source: 'Yuno1',
    url: 'https://mythical122.github.io/Yuno1/',
    verification: 'Inspected by browser snapshot and page-content extraction.',
    importantMoments: ['The paper notes thank her for giving lots of love and describe falling in love every day.'],
    letters: ['Paper messages call her cute, amazing, and an important favorite person.'],
    notes: ['"Thankyou baby for giving me lots of love."', '"I fallen in Love with You every day."', '"How can be someone so cute."', '"My Favorite very very Important Person."', '"Dear Shreemati, You are Cute Amazing."'],
    surprises: ['A playful stack of love notes is revealed as the paper is moved.'],
    interactions: ['The viewer is invited to drag paper notes around.'],
    designIdeas: ['Use a refined scrapbook/paper motif for intimate notes.', 'Make discovery tactile and user-controlled rather than autoplaying.'],
  },
]