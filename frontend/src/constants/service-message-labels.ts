import { API_ENDPOINTS } from '../configs/api-endpoints.config.ts'

export const SERVICE_MESSAGE_LABELS = {
  [API_ENDPOINTS.USERS]: 'User',
  [API_ENDPOINTS.ANIME]: 'Anime',
  [API_ENDPOINTS.EPISODES]: 'Episode',
  [API_ENDPOINTS.GENRES]: 'Genre',
} as const
