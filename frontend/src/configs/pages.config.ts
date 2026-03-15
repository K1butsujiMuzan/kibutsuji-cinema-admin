import { MANY_UPPER_LABELS } from '../constants/service-message-labels.ts'

export const PAGES = {
  LOGIN: '/',
  DASHBOARD: '/dashboard',
  ANIME: '/anime',
  EPISODES: '/episodes',
  GENRES: '/genres',
  RATINGS: '/ratings',
  LIKES: '/likes',
  COMMENTS: '/comments',
  LISTS: '/lists',
  USERS: '/users',
} as const

export const PAGE_TITLES = {
  LOGIN: 'Login',
  DASHBOARD: 'Main',
  NOT_FOUND: 'Not Found',
  ANIME: MANY_UPPER_LABELS.ANIME,
  EPISODES: MANY_UPPER_LABELS.EPISODES,
  GENRES: MANY_UPPER_LABELS.GENRES,
  RATINGS: MANY_UPPER_LABELS.RATINGS,
  LIKES: MANY_UPPER_LABELS.LIKES,
  COMMENTS: MANY_UPPER_LABELS.COMMENTS,
  LISTS: MANY_UPPER_LABELS.LISTS,
  USERS: MANY_UPPER_LABELS.USERS,
} as const
