import type { TLikeValue } from './like-value.type.ts'

export type TLike = {
  id: string
  commentId: string
  userId: string
  value: TLikeValue
  createdAt: string
  updatedAt: string
}
