import {
  ANIME_STATUSES,
  type TAnimeStatus,
} from '../../shared/types/anime-status.type.ts'
import {
  ANIME_TYPES,
  type TAnimeType,
} from '../../shared/types/anime-type.type.ts'
import {
  ANIME_AGE_LIMITS,
  type TAnimeAgeLimit,
} from '../../shared/types/anime-age-limit.type.ts'
import type { TFormInformation } from '../../shared/types/form-information.type.ts'

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
  'genre_names',
]

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
  genreNames: string
}

export const initialAnimeData: TFormInformation<TAnimeFormData> = {
  data: {
    id: '',
    slug: '',
    type: ANIME_TYPES[0],
    ageLimit: ANIME_AGE_LIMITS[0],
    description: '',
    episodesCount: 0,
    episodesLength: 0,
    image: '',
    genreNames: '',
    releaseDate: new Date().toISOString().split('T')[0],
    originalTitle: '',
    title: '',
    status: ANIME_STATUSES[0],
  },
  type: 'create',
}
