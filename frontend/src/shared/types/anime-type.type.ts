export type TAnimeType = (typeof ANIME_TYPES)[number]

export const ANIME_TYPES = [
  'TVSERIES',
  'MOVIE',
  'SHORTFILM',
  'SPECIAL',
  'OVA',
  'ONA',
  'CLIP',
] as const
