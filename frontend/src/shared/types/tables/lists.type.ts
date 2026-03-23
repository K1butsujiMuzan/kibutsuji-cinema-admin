import type { TListType } from '../../enums/list-type.type.ts'

export type TList = {
  id: string
  animeId: string
  list: TListType
  userId: string
  createdAt: string
  updatedAt: string
}
