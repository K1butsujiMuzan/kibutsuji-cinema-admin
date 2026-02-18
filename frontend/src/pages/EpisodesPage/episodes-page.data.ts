export const episodesColumns: string[] = [
  'id',
  'anime_id',
  'created_at',
  'episode_number',
  'title',
  'updated_at',
  'views',
]

export type TEpisodeFormData = {
  id: string
  animeId: string
  episodeNumber: number
  views: number
  title: string
}
