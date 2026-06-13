export type TAuthor = {
  id: string
  englishName: string
  originalName: string | null
  image: string | null
  createdAt: string
  updatedAt: string
}

export type TAuthorFormData = Omit<TAuthor, 'createdAt' | 'updatedAt'>
export type TAuthorData = Omit<TAuthor, 'createdAt' | 'updatedAt' | 'id'>
