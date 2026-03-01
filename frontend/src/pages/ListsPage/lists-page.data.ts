import type { TFormInformation } from '../../shared/types/form-information.type.ts'
import type { TList } from '../../shared/types/lists.type.ts'

export const listsColumns: string[] = [
  'id',
  'anime_id',
  'created_at',
  'list',
  'updated_at',
  'user_id',
]

export type TListFormData = Omit<TList, 'createdAt' | 'updatedAt'>

export const initialListData: TFormInformation<TListFormData> = {
  data: {
    id: '',
    animeId: '',
    list: 'ABANDONED',
    userId: '',
  },
  type: 'create',
}
