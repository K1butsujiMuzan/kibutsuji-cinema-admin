import type { TAnimeStatus } from '../../shared/types/anime-status.type.ts'
import type { TAnimeType } from '../../shared/types/anime-type.type.ts'
import type { TAnimeAgeLimit } from '../../shared/types/anime-age-limit.type.ts'

export const animeColumns: string[] = [
  'id',
  'ageLimit',
  'created_at',
  'description',
  'episodes_count',
  'episodes_length',
  'episodes_released',
  'image',
  'original_title',
  'release_date',
  'slug',
  'status',
  'title',
  'type',
  'updated_at',
  'views',
  'genres_ids',
]

export const animeAgeLimits: string[] = ['AGE_6', 'AGE_12', 'AGE_16', 'AGE_18']
export const animeTypes: string[] = [
  'TVSERIES',
  'MOVIE',
  'SHORTFILM',
  'SPECIAL',
  'OVA',
  'ONA',
  'CLIP',
]

export const animeStatuses: string[] = ['ONGOING', 'COMPLETED', 'ANNOUNCEMENT']

export type TAnimeFormData = {
  id: string
  title: string
  description: string
  ageLimit: TAnimeAgeLimit
  status: TAnimeStatus
  type: TAnimeType
  episodesCount: number
  episodesLength: number
  releaseDate: string
  image: string
  originalTitle: string
  slug: string
  genres: string
}
