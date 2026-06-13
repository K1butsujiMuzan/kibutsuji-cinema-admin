import type { TAnimeAgeLimit } from '../../enums/anime-age-limit.type.ts'
import type { TAnimeType } from '../../enums/anime-type.type.ts'
import type { TAnimeStatus } from '../../enums/anime-status.type.ts'
import type { TGenre } from './genres.type.ts'
import type { TAnimeAccess } from '../../enums/anime-access.type.ts'

export type TAnimeWithGenres = {
  id: string
  slug: string
  type: TAnimeType
  ageLimit: TAnimeAgeLimit
  access: TAnimeAccess
  description: string | null
  authorName: string | null
  episodesCount: number
  episodesLength: number
  image: string | null
  backgroundImage: string | null
  releaseDate: string
  originalTitle: string | null
  title: string
  status: TAnimeStatus
  rating: number
  episodesReleased: number
  views: number
  createdAt: string
  updatedAt: string
  genres: TGenre[]
}

export type TAnime = Omit<TAnimeWithGenres, 'genres'>
export type TAnimeData = Omit<
  TAnimeWithGenres,
  | 'genres'
  | 'createdAt'
  | 'updatedAt'
  | 'views'
  | 'episodesReleased'
  | 'rating'
  | 'id'
> & { genreNames: string[] }
export type TAnimeFormData = Omit<
  TAnimeWithGenres,
  'genres' | 'createdAt' | 'updatedAt' | 'views' | 'episodesReleased' | 'rating'
> & { genreNames: string }
