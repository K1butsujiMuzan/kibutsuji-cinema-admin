import {
  ANIME_STATUSES,
  type TAnimeStatus,
} from '../../shared/enums/anime-status.type.ts'
import {
  ANIME_TYPES,
  type TAnimeType,
} from '../../shared/enums/anime-type.type.ts'
import {
  ANIME_AGE_LIMITS,
  type TAnimeAgeLimit,
} from '../../shared/enums/anime-age-limit.type.ts'
import type { TFormInformation } from '../../shared/types/form-information.type.ts'
import {
  ANIME_ACCESSES,
  type TAnimeAccess,
} from '../../shared/enums/anime-access.type.ts'
import { currentDate } from '../../lib/date-formater.ts'

export const animeColumns: string[] = [
  'id',
  'access',
  'ageLimit',
  'created_at',
  'description',
  'episodes_count',
  'episodes_length',
  'episodes_released',
  'image',
  'original_title',
  'rating',
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
  access: TAnimeAccess
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
    access: ANIME_ACCESSES[0],
    description: '',
    episodesCount: 0,
    episodesLength: 0,
    image: '',
    genreNames: '',
    releaseDate: currentDate(),
    originalTitle: '',
    title: '',
    status: ANIME_STATUSES[0],
  },
  type: 'create',
}
