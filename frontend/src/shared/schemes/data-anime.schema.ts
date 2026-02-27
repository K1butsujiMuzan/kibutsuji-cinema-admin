import { z } from 'zod'
import { MAX_INT } from '../../constants/max-values.ts'
import { SLUG_REGEXP } from '../../constants/regexp.ts'
import { ANIME_TYPES } from '../types/anime-type.type.ts'
import { ANIME_AGE_LIMITS } from '../types/anime-age-limit.type.ts'
import { ANIME_STATUSES } from '../types/anime-status.type.ts'

export const DataAnimeSchema = z.object({
  ageLimit: z.enum(ANIME_AGE_LIMITS),
  description: z.string().trim(),
  episodesCount: z.number().int().nonnegative().max(MAX_INT),
  episodesLength: z.number().int().nonnegative().max(MAX_INT),
  image: z.string().trim(),
  originalTitle: z.string().trim(),
  releaseDate: z.string().trim(),
  slug: z.string().trim().min(3).regex(SLUG_REGEXP),
  status: z.enum(ANIME_STATUSES),
  title: z.string().trim().min(3),
  type: z.enum(ANIME_TYPES),
  genreNames: z.string(),
})

export type TDataAnime = z.infer<typeof DataAnimeSchema>
export type TDataSubmitAnime = Omit<TDataAnime, 'genreNames'> & {
  genreNames: string[]
}
