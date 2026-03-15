import { TABLE_KEY } from './table-key.config.ts'

export const QUERY_KEYS = {
  [TABLE_KEY.ANIME]: 'anime',
  [TABLE_KEY.COMMENTS]: 'comments',
  [TABLE_KEY.EPISODES]: 'episodes',
  [TABLE_KEY.GENRES]: 'genres',
  [TABLE_KEY.LIKES]: 'likes',
  [TABLE_KEY.LISTS]: 'lists',
  [TABLE_KEY.RATINGS]: 'ratings',
  [TABLE_KEY.USERS]: 'users',
} as const

export const DASHBOARD_QUERY_KEYS = {
  QUANTITY: 'quantity',
  TOP_ANIME_VIEWS: 'top-anime-views',
  TOP_ANIME_RATINGS: 'top-anime-ratings',
} as const

export type TQueryKey = (typeof QUERY_KEYS)[keyof typeof QUERY_KEYS]
export type TDashboardQueryKey =
  (typeof DASHBOARD_QUERY_KEYS)[keyof typeof DASHBOARD_QUERY_KEYS]
