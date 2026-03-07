import { TABLE_KEY } from './table-key.config.ts'

export const BASE_URL: string =
  import.meta.env.VITE_BASE_URL || 'https://kibutsuji-cinema.vercel.app/api'

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/login`,
  TOKEN: `${BASE_URL}/token-check`,

  [TABLE_KEY.ANIME]: `${BASE_URL}/anime`,
  [TABLE_KEY.COMMENTS]: `${BASE_URL}/comments`,
  [TABLE_KEY.EPISODES]: `${BASE_URL}/episodes`,
  [TABLE_KEY.GENRES]: `${BASE_URL}/genres`,
  [TABLE_KEY.LIKES]: `${BASE_URL}/likes`,
  [TABLE_KEY.LISTS]: `${BASE_URL}/lists`,
  [TABLE_KEY.RATINGS]: `${BASE_URL}/ratings`,
  [TABLE_KEY.USERS]: `${BASE_URL}/users`,
} as const

export const CRUD_ENDPOINTS = {
  [TABLE_KEY.ANIME]: API_ENDPOINTS.ANIME,
  [TABLE_KEY.COMMENTS]: API_ENDPOINTS.COMMENTS,
  [TABLE_KEY.EPISODES]: API_ENDPOINTS.EPISODES,
  [TABLE_KEY.GENRES]: API_ENDPOINTS.GENRES,
  [TABLE_KEY.LIKES]: API_ENDPOINTS.LIKES,
  [TABLE_KEY.LISTS]: API_ENDPOINTS.LISTS,
  [TABLE_KEY.RATINGS]: API_ENDPOINTS.RATINGS,
  [TABLE_KEY.USERS]: API_ENDPOINTS.USERS,
} as const
