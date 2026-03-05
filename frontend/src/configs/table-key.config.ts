export const TABLE_KEY = {
  ANIME: 'ANIME',
  COMMENTS: 'COMMENTS',
  EPISODES: 'EPISODES',
  GENRES: 'GENRES',
  LIKES: 'LIKES',
  LISTS: 'LISTS',
  RATINGS: 'RATINGS',
  USERS: 'USERS',
} as const

export type TCrudEndpointKeys = (typeof TABLE_KEY)[keyof typeof TABLE_KEY]
