import { z } from 'zod'

export const dataEpisodeSchema = z.object({
  animeId: z.string().min(3),
  episodeNumber: z.number().min(1),
  title: z.string().min(3),
  views: z.number().nonnegative().max(999_999_999),
})

export type TDataEpisode = z.infer<typeof dataEpisodeSchema>
