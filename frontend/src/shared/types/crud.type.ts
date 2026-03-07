import { TABLE_KEY } from '../../configs/table-key.config.ts'
import type { TComment } from './comments.type.ts'
import type { TEpisode } from './episodes.type.ts'
import type { TLike } from './likes.type.ts'
import type { TList } from './lists.type.ts'
import type { TRating } from './ratings.type.ts'
import type { TUser } from './users.type.ts'
import type { TAnime } from './anime.type.ts'
import type { TGenre } from './genres.type.ts'
import type { TCreateUser, TUpdateUser } from '../schemes/user.schema.ts'
import type { TDataSubmitAnime } from '../schemes/anime.schema.ts'
import type {
  TCreateComment,
  TUpdateComment,
} from '../schemes/comment.schema.ts'
import type {
  TCreateEpisode,
  TUpdateEpisode,
} from '../schemes/episode.schema.ts'
import type { TCreateLike, TUpdateLike } from '../schemes/like.schema.ts'
import type { TCreateList, TUpdateList } from '../schemes/list.schema.ts'
import type { TDataGenre } from '../schemes/genre.schema.ts'
import type { TCreateRating, TUpdateRating } from '../schemes/rating.schema.ts'

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

export type TCreateEndpoint = {
  [TABLE_KEY.USERS]: TCreateUser
  [TABLE_KEY.ANIME]: TDataSubmitAnime
  [TABLE_KEY.COMMENTS]: TCreateComment
  [TABLE_KEY.EPISODES]: TCreateEpisode
  [TABLE_KEY.LIKES]: TCreateLike
  [TABLE_KEY.LISTS]: TCreateList
  [TABLE_KEY.GENRES]: TDataGenre
  [TABLE_KEY.RATINGS]: TCreateRating
}

export type TUpdateEndpoint = {
  [TABLE_KEY.USERS]: TUpdateUser
  [TABLE_KEY.ANIME]: TDataSubmitAnime
  [TABLE_KEY.COMMENTS]: TUpdateComment
  [TABLE_KEY.EPISODES]: TUpdateEpisode
  [TABLE_KEY.LIKES]: TUpdateLike
  [TABLE_KEY.LISTS]: TUpdateList
  [TABLE_KEY.GENRES]: TDataGenre
  [TABLE_KEY.RATINGS]: TUpdateRating
}

export type TCreateUpdateFormData = {
  [TABLE_KEY.COMMENTS]: TComment
  [TABLE_KEY.EPISODES]: TEpisode
  [TABLE_KEY.LIKES]: TLike
  [TABLE_KEY.LISTS]: TList
  [TABLE_KEY.RATINGS]: TRating
  [TABLE_KEY.USERS]: TUser
}

export type TCreateUpdateEndpointKeys = keyof TCreateUpdateFormData
