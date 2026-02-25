import { z } from 'zod'
import { MAX_INT } from '../../constants/max-int.ts'

export const dataEpisodeSchema = z.object({
  animeId: z.string().trim().min(24),
  episodeNumber: z.number().int().positive().max(MAX_INT),
  title: z.string().trim().min(3),
  views: z.number().int().nonnegative().max(MAX_INT),
})

export type TDataEpisode = z.infer<typeof dataEpisodeSchema>
