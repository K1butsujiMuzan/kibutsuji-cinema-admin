import type { TEpisode } from '../shared/types/episodes.type.ts'
import type { TRating } from '../shared/types/ratings.type.ts'
import type { TUser } from '../shared/types/users.type.ts'
import type { TList } from '../shared/types/lists.type.ts'
import type { TComment } from '../shared/types/comments.type.ts'
import type { TLike } from '../shared/types/likes.type.ts'

export const QUERY_KEYS = {
  ANIME: 'anime',
  COMMENT: 'comments',
  EPISODES: 'episodes',
  GENRES: 'genres',
  LIKES: 'likes',
  LISTS: 'lists',
  RATINGS: 'ratings',
  USERS: 'users',
} as const

export type TQueryKey = (typeof QUERY_KEYS)[keyof typeof QUERY_KEYS]

export type TCreateUpdateFormData = {
  [QUERY_KEYS.COMMENT]: TComment
  [QUERY_KEYS.EPISODES]: TEpisode
  [QUERY_KEYS.LIKES]: TLike
  [QUERY_KEYS.LISTS]: TList
  [QUERY_KEYS.RATINGS]: TRating
  [QUERY_KEYS.USERS]: TUser
}
