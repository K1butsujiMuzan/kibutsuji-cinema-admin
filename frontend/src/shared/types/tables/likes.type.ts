import type { TLikeValue } from '../../enums/like-value.type.ts'

export type TLike = {
  id: string
  commentId: string
  userId: string
  value: TLikeValue
  createdAt: string
  updatedAt: string
}
