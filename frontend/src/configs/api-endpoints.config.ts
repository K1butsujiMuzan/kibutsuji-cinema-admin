import type { TDataSubmitAnime } from '../shared/schemes/anime.schema.ts'
import type { TDataGenre } from '../shared/schemes/genre.schema.ts'
import type { TCreateUser, TUpdateUser } from '../shared/schemes/user.schema.ts'
import type { TUser } from '../shared/types/users.type.ts'
import type { TAnime } from '../shared/types/anime.type.ts'
import type { TEpisode } from '../shared/types/episodes.type.ts'
import type { TGenre } from '../shared/types/genres.type.ts'
import type { TRating } from '../shared/types/ratings.type.ts'
import type { TList } from '../shared/types/lists.type.ts'
import type { TComment } from '../shared/types/comments.type.ts'
import type {
  TCreateComment,
  TUpdateComment,
} from '../shared/schemes/comment.schema.ts'
import type {
  TCreateRating,
  TUpdateRating,
} from '../shared/schemes/rating.schema.ts'
import type { TCreateList, TUpdateList } from '../shared/schemes/list.schema.ts'
import type {
  TCreateEpisode,
  TUpdateEpisode,
} from '../shared/schemes/episode.schema.ts'

export const BASE_URL: string =
  import.meta.env.VITE_BASE_URL || 'https://kibutsuji-cinema.vercel.app/api'

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/login`,
  TOKEN: `${BASE_URL}/token-check`,

  ANIME: `${BASE_URL}/anime`,
  COMMENTS: `${BASE_URL}/comments`,
  EPISODES: `${BASE_URL}/episodes`,
  GENRES: `${BASE_URL}/genres`,
  LISTS: `${BASE_URL}/lists`,
  RATINGS: `${BASE_URL}/ratings`,
  USERS: `${BASE_URL}/users`,
} as const

export type TCreateEndpoint = {
  [API_ENDPOINTS.USERS]: TCreateUser
  [API_ENDPOINTS.ANIME]: TDataSubmitAnime
  [API_ENDPOINTS.COMMENTS]: TCreateComment
  [API_ENDPOINTS.EPISODES]: TCreateEpisode
  [API_ENDPOINTS.LISTS]: TCreateList
  [API_ENDPOINTS.GENRES]: TDataGenre
  [API_ENDPOINTS.RATINGS]: TCreateRating
}

export type TUpdateEndpoint = {
  [API_ENDPOINTS.USERS]: TUpdateUser
  [API_ENDPOINTS.ANIME]: TDataSubmitAnime
  [API_ENDPOINTS.COMMENTS]: TUpdateComment
  [API_ENDPOINTS.EPISODES]: TUpdateEpisode
  [API_ENDPOINTS.LISTS]: TUpdateList
  [API_ENDPOINTS.GENRES]: TDataGenre
  [API_ENDPOINTS.RATINGS]: TUpdateRating
}

export type TGetEndpoint = {
  [API_ENDPOINTS.USERS]: TUser
  [API_ENDPOINTS.ANIME]: TAnime
  [API_ENDPOINTS.COMMENTS]: TComment
  [API_ENDPOINTS.EPISODES]: TEpisode
  [API_ENDPOINTS.LISTS]: TList
  [API_ENDPOINTS.GENRES]: TGenre
  [API_ENDPOINTS.RATINGS]: TRating
}
