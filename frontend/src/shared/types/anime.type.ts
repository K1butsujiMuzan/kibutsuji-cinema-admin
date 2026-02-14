import type { TAnimeAgeLimit } from './anime-age-limit.type.ts'
import type { TAnimeType } from './anime-type.type.ts'
import type { TAnimeStatus } from './anime-status.type.ts'
import type { TGenres } from './genres.type.ts'

export type TAnime = {
  id: string
  slug: string
  title: string
  image: string | null | undefined
  originalTitle: string
  description: string | null | undefined
  ageLimit: TAnimeAgeLimit
  releaseDate: string
  episodesReleased: number
  episodesCount: number
  episodesLength: number
  type: TAnimeType
  status: TAnimeStatus
  views: number
  createdAt: string
  updatedAt: string
  genres: Omit<TGenres, 'anime'>[]
}
