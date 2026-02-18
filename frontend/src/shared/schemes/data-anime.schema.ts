import { z } from 'zod'

export const DataAnimeSchema = z.object({
  ageLimit: z.enum(['AGE_6', 'AGE_12', 'AGE_16', 'AGE_18']),
  description: z.string(),
  episodesCount: z.number().nonnegative().max(100000),
  episodesLength: z.number().nonnegative().max(10000),
  image: z.string(),
  originalTitle: z.string(),
  releaseDate: z.string(),
  slug: z.string().min(3),
  status: z.enum(['ONGOING', 'COMPLETED', 'ANNOUNCEMENT']),
  title: z.string().min(3),
  type: z.enum([
    'TVSERIES',
    'MOVIE',
    'SHORTFILM',
    'SPECIAL',
    'OVA',
    'ONA',
    'CLIP',
  ]),
  genres: z.string(),
})

export type TDataAnime = z.infer<typeof DataAnimeSchema>
