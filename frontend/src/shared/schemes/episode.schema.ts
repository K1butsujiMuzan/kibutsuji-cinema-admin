import { z } from 'zod'
import { ID_MIN_LENGTH, MAX_INT } from '../../constants/limits.ts'

export const createEpisodeSchema = z.object({
  animeId: z.string().trim().min(ID_MIN_LENGTH),
  episodeNumber: z.number().int().positive().max(MAX_INT),
  title: z.string().trim().min(3),
  views: z.number().int().nonnegative().max(MAX_INT),
})

export const updateEpisodeSchema = createEpisodeSchema.omit({ animeId: true })

export type TCreateEpisode = z.infer<typeof createEpisodeSchema>
export type TUpdateEpisode = z.infer<typeof updateEpisodeSchema>
