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
import type { TLike } from '../shared/types/likes.type.ts'
import type { TCreateLike, TUpdateLike } from '../shared/schemes/like.schema.ts'
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

export type TCreateEndpoint = {
  [API_ENDPOINTS.USERS]: TCreateUser
  [API_ENDPOINTS.ANIME]: TDataSubmitAnime
  [API_ENDPOINTS.COMMENTS]: TCreateComment
  [API_ENDPOINTS.EPISODES]: TCreateEpisode
  [API_ENDPOINTS.LIKES]: TCreateLike
  [API_ENDPOINTS.LISTS]: TCreateList
  [API_ENDPOINTS.GENRES]: TDataGenre
  [API_ENDPOINTS.RATINGS]: TCreateRating
}

export type TUpdateEndpoint = {
  [API_ENDPOINTS.USERS]: TUpdateUser
  [API_ENDPOINTS.ANIME]: TDataSubmitAnime
  [API_ENDPOINTS.COMMENTS]: TUpdateComment
  [API_ENDPOINTS.EPISODES]: TUpdateEpisode
  [API_ENDPOINTS.LIKES]: TUpdateLike
  [API_ENDPOINTS.LISTS]: TUpdateList
  [API_ENDPOINTS.GENRES]: TDataGenre
  [API_ENDPOINTS.RATINGS]: TUpdateRating
}

export type TGetEndpoint = {
  [TABLE_KEY.ANIME]: TAnime[]
  [TABLE_KEY.COMMENTS]: TComment[]
  [TABLE_KEY.EPISODES]: TEpisode[]
  [TABLE_KEY.GENRES]: TGenre[]
  [TABLE_KEY.LIKES]: TLike[]
  [TABLE_KEY.LISTS]: TList[]
  [TABLE_KEY.RATINGS]: TRating[]
  [TABLE_KEY.USERS]: TUser[]
}

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
