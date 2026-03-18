import { z } from 'zod'
import { MAX_DESCRIPTION_LENGTH, MAX_INT } from '../../constants/limits.ts'
import { SLUG_REGEXP } from '../../constants/regexp.ts'
import { ANIME_TYPES } from '../enums/anime-type.type.ts'
import { ANIME_AGE_LIMITS } from '../enums/anime-age-limit.type.ts'
import { ANIME_STATUSES } from '../enums/anime-status.type.ts'
import { ANIME_ACCESSES } from '../enums/anime-access.type.ts'

export const DataAnimeSchema = z.object({
  ageLimit: z.enum(ANIME_AGE_LIMITS),
  description: z.string().trim().max(MAX_DESCRIPTION_LENGTH),
  episodesCount: z.number().int().nonnegative().max(MAX_INT),
  episodesLength: z.number().int().nonnegative().max(MAX_INT),
  image: z.string().trim(),
  originalTitle: z.string().trim(),
  releaseDate: z.string().trim(),
  slug: z.string().trim().min(3).regex(SLUG_REGEXP),
  status: z.enum(ANIME_STATUSES),
  title: z.string().trim().min(3),
  type: z.enum(ANIME_TYPES),
  access: z.enum(ANIME_ACCESSES),
  genreNames: z.string(),
})

export type TDataAnime = z.infer<typeof DataAnimeSchema>
export type TDataSubmitAnime = Omit<TDataAnime, 'genreNames'> & {
  genreNames: string[]
}
