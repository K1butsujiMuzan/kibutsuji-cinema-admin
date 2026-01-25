export const BASE_URL =
  import.meta.env.VITE_BASE_URL || 'https://kibutsuji-cinema.vercel.app/api'

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/admin`,
  TOKEN: `${BASE_URL}/admin-check`,
} as const
