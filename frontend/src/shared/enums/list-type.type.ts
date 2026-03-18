export type TListType = (typeof LIST_TYPES)[number]

export const LIST_TYPES = [
  'ABANDONED',
  'COMPLETED',
  'FAVORITE',
  'PLANNED',
  'WATCHING',
] as const
