import type { TAnimeAgeLimit } from '../../enums/anime-age-limit.type.ts'
import type { TAnimeType } from '../../enums/anime-type.type.ts'
import type { TAnimeStatus } from '../../enums/anime-status.type.ts'
import type { TGenre } from './genres.type.ts'
import type { TAnimeAccess } from '../../enums/anime-access.type.ts'

export type TAnimeWithGenres = {
  id: string
  access: TAnimeAccess
  slug: string
  title: string
  image: string | null
  originalTitle: string | null
  description: string | null
  ageLimit: TAnimeAgeLimit
  rating: number
  releaseDate: string
  episodesReleased: number
  episodesCount: number
  episodesLength: number
  type: TAnimeType
  status: TAnimeStatus
  views: number
  createdAt: string
  updatedAt: string
  genres: TGenre[]
}

export type TAnime = Omit<TAnimeWithGenres, 'genres'>
