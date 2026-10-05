export type RelationshipMoment = {
  date: string
  title: string
  story: string
  image: string
  quote?: string
  category: string
  verified: boolean
}

// Only the beginning date is established; fill the remaining entries with real memories.
export const moments: RelationshipMoment[] = [
  { date: '10 April 2022', title: 'The beginning', story: 'The day our story began. Add the real memory of how that day felt.', image: 'images/memories/yuno-dee3.png', quote: 'One date on the calendar, and a whole world after it.', category: 'THE BEGINNING', verified: true },
  { date: 'ADD YOUR DATE', title: 'The first little adventure', story: 'Add the place, the photo, or the tiny detail that made this one yours.', image: 'images/yuno11.jpg', category: 'FIRST MEMORIES', verified: false },
  { date: 'ADD YOUR DATE', title: 'The laugh we kept', story: 'Write down the joke or silly moment that still makes you smile.', image: 'images/yuno16.jpg', category: 'THE LAUGHS', verified: false },
  { date: 'ADD YOUR DATE', title: 'Through the complicated bits', story: 'Add a real hard day and what you learned about finding your way back to each other.', image: 'images/memories/yuno-dee1.png', category: 'THE COMEBACKS', verified: false },
  { date: 'ADD YOUR DATE', title: 'An ordinary favorite', story: 'A small day can stay with you. Add the ordinary moment that became yours.', image: 'images/memories/yuno-dee2.png', quote: 'Every ordinary day with you can quietly become a favorite.', category: 'THE LITTLE THINGS', verified: false },
  { date: 'TODAY', title: 'Still becoming us', story: 'Add a recent moment, then keep making room for the next one.', image: 'images/memories/yuno-dee4.png.jpg', category: 'TODAY', verified: false },
]