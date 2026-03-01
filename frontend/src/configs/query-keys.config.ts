import type { TAnime } from '../shared/types/anime.type.ts'
import type { TEpisode } from '../shared/types/episodes.type.ts'
import type { TGenre } from '../shared/types/genres.type.ts'
import type { TRating } from '../shared/types/ratings.type.ts'
import type { TUser } from '../shared/types/users.type.ts'
import type { TList } from '../shared/types/lists.type.ts'

export const QUERY_KEYS = {
  ANIME: 'anime',
  EPISODES: 'episodes',
  GENRES: 'genres',
  LISTS: 'lists',
  RATINGS: 'ratings',
  USERS: 'users',
} as const

export type TServerData = {
  [QUERY_KEYS.ANIME]: TAnime[]
  [QUERY_KEYS.EPISODES]: TEpisode[]
  [QUERY_KEYS.GENRES]: TGenre[]
  [QUERY_KEYS.LISTS]: TList[]
  [QUERY_KEYS.RATINGS]: TRating[]
  [QUERY_KEYS.USERS]: TUser[]
}
