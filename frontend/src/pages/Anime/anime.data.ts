import { ANIME_STATUSES } from '../../shared/enums/anime-status.type.ts'
import { ANIME_TYPES } from '../../shared/enums/anime-type.type.ts'
import { ANIME_AGE_LIMITS } from '../../shared/enums/anime-age-limit.type.ts'
import type { TFormInformation } from '../../shared/types/form-information.type.ts'
import { ANIME_ACCESSES } from '../../shared/enums/anime-access.type.ts'
import { currentDate } from '../../lib/date-formater.ts'
import type { TAnimeFormData } from '../../shared/types/tables/anime.type.ts'

export const animeColumns: string[] = [
  'id',
  'access',
  'age_limit',
  'author_slug',
  'background_image',
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

export const initialAnimeData: TFormInformation<TAnimeFormData> = {
  data: {
    id: '',
    slug: '',
    type: ANIME_TYPES[0],
    ageLimit: ANIME_AGE_LIMITS[0],
    access: ANIME_ACCESSES[0],
    description: '',
    authorSlug: '',
    episodesCount: 0,
    episodesLength: 0,
    image: '',
    backgroundImage: '',
    releaseDate: currentDate(),
    originalTitle: '',
    title: '',
    status: ANIME_STATUSES[0],
    genreNames: '',
  },
  type: 'create',
}
