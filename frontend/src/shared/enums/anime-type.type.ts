export type TAnimeType = (typeof ANIME_TYPES)[number]

export const ANIME_TYPES = [
  'TV_SERIES',
  'MOVIE',
  'SHORT_FILM',
  'SPECIAL',
  'OVA',
  'ONA',
  'CLIP',
] as const
