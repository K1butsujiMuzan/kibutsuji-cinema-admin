import { TABLE_KEY } from '../configs/table-key.config.ts'

export const UPPER_LABELS = {
  [TABLE_KEY.ANIME]: 'Anime',
  [TABLE_KEY.COMMENTS]: 'Comment',
  [TABLE_KEY.EPISODES]: 'Episode',
  [TABLE_KEY.GENRES]: 'Genre',
  [TABLE_KEY.LIKES]: 'Like',
  [TABLE_KEY.LISTS]: 'List',
  [TABLE_KEY.RATINGS]: 'Rating',
  [TABLE_KEY.SUBSCRIPTIONS]: 'Subscription',
  [TABLE_KEY.TRANSACTIONS]: 'Transaction',
  [TABLE_KEY.USERS]: 'User',
} as const

export const SERVICE_MANY_UPPER_LABELS = {
  [TABLE_KEY.ANIME]: 'Anime',
  [TABLE_KEY.COMMENTS]: 'Comment(s)',
  [TABLE_KEY.EPISODES]: 'Episode(s)',
  [TABLE_KEY.GENRES]: 'Genre(s)',
  [TABLE_KEY.LIKES]: 'Like(s)',
  [TABLE_KEY.LISTS]: 'List(s)',
  [TABLE_KEY.RATINGS]: 'Rating(s)',
  [TABLE_KEY.SUBSCRIPTIONS]: 'Subscription(s)',
  [TABLE_KEY.TRANSACTIONS]: 'Transaction(s)',
  [TABLE_KEY.USERS]: 'User(s)',
} as const

export const MANY_UPPER_LABELS = {
  [TABLE_KEY.ANIME]: 'Anime',
  [TABLE_KEY.COMMENTS]: 'Comments',
  [TABLE_KEY.EPISODES]: 'Episodes',
  [TABLE_KEY.GENRES]: 'Genres',
  [TABLE_KEY.LIKES]: 'Likes',
  [TABLE_KEY.LISTS]: 'Lists',
  [TABLE_KEY.RATINGS]: 'Ratings',
  [TABLE_KEY.SUBSCRIPTIONS]: 'Subscriptions',
  [TABLE_KEY.TRANSACTIONS]: 'Transactions',
  [TABLE_KEY.USERS]: 'Users',
} as const

export const LOWER_LABELS = {
  [TABLE_KEY.ANIME]: 'anime',
  [TABLE_KEY.COMMENTS]: 'comment',
  [TABLE_KEY.EPISODES]: 'episode',
  [TABLE_KEY.GENRES]: 'genre',
  [TABLE_KEY.LIKES]: 'like',
  [TABLE_KEY.LISTS]: 'list',
  [TABLE_KEY.RATINGS]: 'rating',
  [TABLE_KEY.SUBSCRIPTIONS]: 'subscription',
  [TABLE_KEY.TRANSACTIONS]: 'transaction',
  [TABLE_KEY.USERS]: 'user',
} as const

export const MANY_LOWER_LABELS = {
  [TABLE_KEY.ANIME]: 'anime',
  [TABLE_KEY.COMMENTS]: 'comment(s)',
  [TABLE_KEY.EPISODES]: 'episode(s)',
  [TABLE_KEY.GENRES]: 'genre(s)',
  [TABLE_KEY.LIKES]: 'like(s)',
  [TABLE_KEY.LISTS]: 'list(s)',
  [TABLE_KEY.RATINGS]: 'rating(s)',
  [TABLE_KEY.SUBSCRIPTIONS]: 'subscription(s)',
  [TABLE_KEY.TRANSACTIONS]: 'transaction(s)',
  [TABLE_KEY.USERS]: 'user(s)',
} as const

export const SEARCH_LABELS = {
  [TABLE_KEY.ANIME]: 'Title',
  [TABLE_KEY.COMMENTS]: 'Text',
  [TABLE_KEY.EPISODES]: 'Anime id',
  [TABLE_KEY.GENRES]: 'Name',
  [TABLE_KEY.LIKES]: 'Comment id',
  [TABLE_KEY.LISTS]: 'User id',
  [TABLE_KEY.RATINGS]: 'Anime id',
  [TABLE_KEY.SUBSCRIPTIONS]: 'User id',
  [TABLE_KEY.TRANSACTIONS]: 'User id',
  [TABLE_KEY.USERS]: 'Email',
}
