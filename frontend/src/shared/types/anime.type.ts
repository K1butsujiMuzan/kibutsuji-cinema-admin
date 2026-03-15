import type { TAnimeAgeLimit } from './anime-age-limit.type.ts'
import type { TAnimeType } from './anime-type.type.ts'
import type { TAnimeStatus } from './anime-status.type.ts'
import type { TGenre } from './genres.type.ts'

export type TAnimeWithGenres = {
  id: string
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
