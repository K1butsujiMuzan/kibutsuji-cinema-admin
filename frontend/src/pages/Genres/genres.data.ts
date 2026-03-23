import type { TGenre } from '../../shared/types/tables/genres.type.ts'
import type { TFormInformation } from '../../shared/types/form-information.type.ts'

export const genresColumns: string[] = [
  'id',
  'created_at',
  'name',
  'updated_at',
]

export type TGenreFormData = Pick<TGenre, 'name' | 'id'>

export const initialGenreData: TFormInformation<TGenreFormData> = {
  data: {
    id: '',
    name: '',
  },
  type: 'create',
}
