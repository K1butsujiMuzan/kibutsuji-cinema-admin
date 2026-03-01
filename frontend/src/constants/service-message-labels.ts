import { API_ENDPOINTS } from '../configs/api-endpoints.config.ts'

export const UPPER_LABELS = {
  ANIME: 'Anime',
  EPISODES: 'Episode',
  GENRES: 'Genre',
  LISTS: 'List',
  RATINGS: 'Rating',
  USERS: 'User',
} as const

export const SERVICE_MANY_UPPER_LABELS = {
  [API_ENDPOINTS.ANIME]: 'Anime',
  [API_ENDPOINTS.EPISODES]: 'Episode(s)',
  [API_ENDPOINTS.GENRES]: 'Genre(s)',
  [API_ENDPOINTS.LISTS]: 'List(s)',
  [API_ENDPOINTS.RATINGS]: 'Rating(s)',
  [API_ENDPOINTS.USERS]: 'User(s)',
} as const

export const MANY_UPPER_LABELS = {
  ANIME: 'Anime',
  EPISODES: 'Episodes',
  GENRES: 'Genres',
  LISTS: 'Lists',
  RATINGS: 'Ratings',
  USERS: 'Users',
} as const

export const LOWER_LABELS = {
  ANIME: 'anime',
  EPISODES: 'episode',
  GENRES: 'genre',
  LISTS: 'list',
  RATINGS: 'rating',
  USERS: 'user',
} as const

export const MANY_LOWER_LABELS = {
  ANIME: 'anime',
  EPISODES: 'episode(s)',
  GENRES: 'genre(s)',
  LISTS: 'list(s)',
  RATINGS: 'rating(s)',
  USERS: 'user(s)',
} as const

export const SERVICE_UPPER_LABELS = {
  [API_ENDPOINTS.ANIME]: UPPER_LABELS.ANIME,
  [API_ENDPOINTS.EPISODES]: UPPER_LABELS.EPISODES,
  [API_ENDPOINTS.GENRES]: UPPER_LABELS.GENRES,
  [API_ENDPOINTS.LISTS]: UPPER_LABELS.LISTS,
  [API_ENDPOINTS.RATINGS]: UPPER_LABELS.RATINGS,
  [API_ENDPOINTS.USERS]: UPPER_LABELS.USERS,
} as const
