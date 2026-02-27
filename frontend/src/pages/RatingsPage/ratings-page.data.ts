import type { TFormInformation } from '../../shared/types/form-information.type.ts'
import type { TRating } from '../../shared/types/ratings.type.ts'

export const ratingsColumns: string[] = [
  'id',
  'anime_id',
  'created_at',
  'rating',
  'updated_at',
  'user_id',
]

export type TRatingFormData = Omit<TRating, 'createdAt' | 'updatedAt'>

export const initialRatingData: TFormInformation<TRatingFormData> = {
  data: {
    id: '',
    animeId: '',
    rating: 1,
    userId: '',
  },
  type: 'create',
}
