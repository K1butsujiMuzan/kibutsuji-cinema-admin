import type { TEpisode } from '../../shared/types/episodes.type.ts'
import type { TFormInformation } from '../../shared/types/form-information.type.ts'

export const episodesColumns: string[] = [
  'id',
  'anime_id',
  'created_at',
  'episode_number',
  'title',
  'updated_at',
  'views',
]

export type TEpisodeFormData = Omit<TEpisode, 'createdAt' | 'updatedAt'>

export const initialEpisodeData: TFormInformation<TEpisodeFormData> = {
  data: {
    id: '',
    animeId: '',
    episodeNumber: 1,
    views: 0,
    title: '',
  },
  type: 'create',
}
