import type { TCreateUser } from '../shared/schemes/create-user.schema.ts'
import type { TDataSubmitAnime } from '../shared/schemes/data-anime.schema.ts'
import type { TDataEpisode } from '../shared/schemes/data-episode.schema.ts'
import type { TDataGenre } from '../shared/schemes/data-genre.schema.ts'
import type { TDataRating } from '../shared/schemes/data-rating.schema.ts'
import type { TUpdateUser } from '../shared/schemes/update-user.schema.ts'
import type { TUser } from '../shared/types/users.type.ts'
import type { TAnime } from '../shared/types/anime.type.ts'
import type { TEpisode } from '../shared/types/episodes.type.ts'
import type { TGenre } from '../shared/types/genres.type.ts'
import type { TRating } from '../shared/types/ratings.type.ts'
import type { TList } from '../shared/types/lists.type.ts'
import type { TDataList } from '../shared/schemes/data-list.schema.ts'

export const BASE_URL: string =
  import.meta.env.VITE_BASE_URL || 'https://kibutsuji-cinema.vercel.app/api'

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/login`,
  TOKEN: `${BASE_URL}/token-check`,

  ANIME: `${BASE_URL}/anime`,
  EPISODES: `${BASE_URL}/episodes`,
  GENRES: `${BASE_URL}/genres`,
  LISTS: `${BASE_URL}/lists`,
  RATINGS: `${BASE_URL}/ratings`,
  USERS: `${BASE_URL}/users`,
} as const

export type TCreateEndpoint = {
  [API_ENDPOINTS.USERS]: TCreateUser
  [API_ENDPOINTS.ANIME]: TDataSubmitAnime
  [API_ENDPOINTS.EPISODES]: TDataEpisode
  [API_ENDPOINTS.LISTS]: TDataList
  [API_ENDPOINTS.GENRES]: TDataGenre
  [API_ENDPOINTS.RATINGS]: TDataRating
}

export type TUpdateEndpoint = {
  [API_ENDPOINTS.USERS]: TUpdateUser
  [API_ENDPOINTS.ANIME]: TDataSubmitAnime
  [API_ENDPOINTS.EPISODES]: TDataEpisode
  [API_ENDPOINTS.LISTS]: TDataList
  [API_ENDPOINTS.GENRES]: TDataGenre
  [API_ENDPOINTS.RATINGS]: TDataRating
}

export type TGetEndpoint = {
  [API_ENDPOINTS.USERS]: TUser
  [API_ENDPOINTS.ANIME]: TAnime
  [API_ENDPOINTS.EPISODES]: TEpisode
  [API_ENDPOINTS.LISTS]: TList
  [API_ENDPOINTS.GENRES]: TGenre
  [API_ENDPOINTS.RATINGS]: TRating
}
