export const BASE_URL: string =
  import.meta.env.VITE_BASE_URL || 'https://kibutsuji-cinema.vercel.app/api'

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/login`,
  TOKEN: `${BASE_URL}/token-check`,
  USERS: `${BASE_URL}/users`,
  ANIME: `${BASE_URL}/anime`,
  EPISODES: `${BASE_URL}/episodes`,
  GENRES: `${BASE_URL}/genres`,
} as const
