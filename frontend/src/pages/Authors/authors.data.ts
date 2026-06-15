import type { TFormInformation } from '../../shared/types/form-information.type.ts'
import type { TAuthorFormData } from '../../shared/types/tables/authors.type.ts'

export const authorColumns: string[] = [
  'id',
  'created_at',
  'englishName',
  'image',
  'original_name',
  'slug',
  'updated_at',
]

export const initialAuthorData: TFormInformation<TAuthorFormData> = {
  data: {
    id: '',
    englishName: '',
    originalName: '',
    image: '',
    slug: '',
  },
  type: 'create',
}
