export type StoryEntry = {
  date: string
  title: string
  description: string
  image?: string
  quote?: string
}

export type Memory = {
  id: number
  title: string
  caption: string
  date: string
  image: string
  category: 'Us' | 'Her' | 'Adventures' | 'Random'
  location?: string
  memory?: string
  favorite?: boolean
}

// EDIT THIS: add real moments and replace image paths with your own local photos.
export const story: StoryEntry[] = [
  { date: '10.04.2022', title: 'The beginning', description: 'The day our story began, and the first page of everything that followed.', quote: 'A date that quietly became one of my favorites.' },
  { date: 'AS WE GOT CLOSER', title: 'The first memories', description: 'The conversations, little details, and the feeling of becoming more familiar with each other.', quote: 'I still find little things I want to tell you.' },
  { date: 'OUR RIDICULOUS SIDE', title: 'The chaos', description: 'Being sincere and silly in the same conversation. A little dramatic, a little stubborn, completely us.', quote: 'I reserve the right to be a little dramatic about all of them.' },
  { date: 'THE LITTLE CHECK-INS', title: 'The laughs', description: 'Unexpected jokes, small messages, and the kind of laugh that can loosen up an ordinary day.', quote: 'A silly moment with you can loosen the whole day.' },
  { date: 'WHEN DAYS FEEL HEAVY', title: 'The hard days', description: 'You never have to make your feelings neat before they deserve care. I can listen without rushing you toward a solution.', quote: 'You do not have to earn rest by doing everything perfectly.' },
  { date: 'AFTER A MISUNDERSTANDING', title: 'Finding our way back', description: 'Making room to listen, be honest, and come back to each other with a little patience.', quote: 'I want to treat you like the person I love, not somebody I need to defeat.' },
  { date: 'THE ORDINARY MOMENTS', title: 'The little things', description: 'The quiet days, familiar details, and moments too ordinary to photograph that became the ones I want to keep.', quote: 'Even the quiet, ordinary ones feel different when I get to share them with you.' },
  { date: 'RIGHT NOW', title: 'Still becoming us', description: 'I am grateful for the time we have shared and every honest chance to keep showing up for each other.', quote: 'I am glad it is you.' },
  { date: 'STILL AHEAD', title: 'More pages to come', description: 'We do not have to know every shape the future will take to leave a little room for what comes next.', quote: 'I hope we keep making room for that version of us.' },
]

export const memories: Memory[] = [
  { id: 1, title: 'Portrait 01', caption: 'Add a caption for this photo.', date: 'PHOTO 01', image: 'images/yuno11.jpg', category: 'Her' },
  { id: 2, title: 'Portrait 02', caption: 'Add a caption for this photo.', date: 'PHOTO 02', image: 'images/yuno12.jpg', category: 'Her' },
  { id: 3, title: 'Portrait 03', caption: 'Add a caption for this photo.', date: 'PHOTO 03', image: 'images/yuno13.jpg', category: 'Her' },
  { id: 4, title: 'Portrait 04', caption: 'Add a caption for this photo.', date: 'PHOTO 04', image: 'images/yuno14.jpg', category: 'Her' },
  { id: 5, title: 'Portrait 05', caption: 'Add a caption for this photo.', date: 'PHOTO 05', image: 'images/yuno15.jpg', category: 'Her' },
  { id: 6, title: 'Portrait 06', caption: 'Add a caption for this photo.', date: 'PHOTO 06', image: 'images/yuno16.jpg', category: 'Her' },
  { id: 7, title: 'Portrait 07', caption: 'Add a caption for this photo.', date: 'PHOTO 07', image: 'images/yuno17.jpg', category: 'Her' },
  { id: 8, title: 'Portrait 08', caption: 'Add a caption for this photo.', date: 'PHOTO 08', image: 'images/yuno18.jpg', category: 'Her' },
  { id: 9, title: 'Illustration 01', caption: 'An illustrated version of us.', date: 'ILLUSTRATION 01', image: 'images/memories/yuno-dee1.png', category: 'Us' },
  { id: 10, title: 'Illustration 02', caption: 'An illustrated version of us.', date: 'ILLUSTRATION 02', image: 'images/memories/yuno-dee2.png', category: 'Us' },
  { id: 11, title: 'Illustration 03', caption: 'An illustrated version of us.', date: 'ILLUSTRATION 03', image: 'images/memories/yuno-dee3.png', category: 'Us' },
  { id: 12, title: 'Illustration 04', caption: 'An illustrated version of us.', date: 'PHOTO 04', image: 'images/memories/yuno-dee4.png.jpg', category: 'Us' },
]

export const constellation = [
  { x: 9, y: 55, title: 'The beginning', date: '10.04.2022', message: 'Where our little universe started.' },
  { x: 28, y: 29, title: 'A first favorite', date: 'ADD A DATE', message: 'ADD YOUR MEMORY HERE.' },
  { x: 48, y: 61, title: 'The easy laughter', date: 'ADD A DATE', message: 'ADD YOUR MEMORY HERE.' },
  { x: 68, y: 33, title: 'A small, perfect day', date: 'ADD A DATE', message: 'ADD YOUR MEMORY HERE.' },
  { x: 89, y: 54, title: 'Still becoming us', date: 'Today, and onward', message: 'There is always another star to add.' },
]

export const polaroids = [
  { image: 'images/polaroids/yuno1.jpg', caption: 'Photo 01' },
  { image: 'images/polaroids/yuno2.jpg', caption: 'Photo 02' },
  { image: 'images/polaroids/yuno3.jpg', caption: 'Photo 03' },
  { image: 'images/polaroids/yuno4.jpg', caption: 'Photo 04' },
  { image: 'images/polaroids/yuno5.jpg', caption: 'Photo 05' },
  { image: 'images/polaroids/yuno6.jpg', caption: 'Photo 06' },
  { image: 'images/polaroids/yuno7.jpg', caption: 'Photo 07' },
  { image: 'images/polaroids/yuno8.jpg', caption: 'Photo 08' },
  { image: 'images/polaroids/yuno9.jpg', caption: 'Photo 09' },
]

export const futureList = ['More sunsets.', 'More random trips.', 'More late-night conversations.', 'More stupid jokes.', 'More photographs.', 'More new places.', 'More memories.', 'More us.']

export const chaosQuestions = [
  { question: 'Who gets angry first?', answer: 'A highly scientific study is required. I volunteer as tribute.' },
  { question: 'Who says sorry first?', answer: 'We both know the important part is finding our way back to a laugh.' },
  { question: 'Who is more stubborn?', answer: 'Obviously you. And yes, I know you are going to disagree.' },
  { question: 'Who overthinks more?', answer: 'Whoever is reading this and thinking about their answer.' },
  { question: 'Who misses the other more?', answer: 'This question is a trap, and my answer is still me.' },
  { question: 'Who is more dramatic?', answer: 'We can call it a tie. I like us both this way.' },
]