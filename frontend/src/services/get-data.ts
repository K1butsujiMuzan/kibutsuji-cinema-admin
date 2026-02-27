import { API_ENDPOINTS } from '../configs/api-endpoints.config.ts'
import type { TUser } from '../shared/types/users.type.ts'
import type { TAnime } from '../shared/types/anime.type.ts'
import type { TEpisode } from '../shared/types/episode.type.ts'
import type { TGenre } from '../shared/types/genres.type.ts'
import { getToken } from '../lib/get-token.ts'
import type { TRating } from '../shared/types/ratings.type.ts'
import { PAGE_LIMIT } from '../constants/max-values.ts'

type TEndpointType = {
  [API_ENDPOINTS.USERS]: TUser
  [API_ENDPOINTS.ANIME]: TAnime
  [API_ENDPOINTS.EPISODES]: TEpisode
  [API_ENDPOINTS.GENRES]: TGenre
  [API_ENDPOINTS.RATINGS]: TRating
}

type TGetData<T> = {
  data: T[]
  count: number
}

export async function getData<T extends keyof TEndpointType>(
  page: number,
  endpoint: T,
): Promise<TGetData<TEndpointType[T]>> {
  const token = getToken()

  try {
    const response = await fetch(
      `${endpoint}?page=${page}&limit=${PAGE_LIMIT}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )
    if (!response.ok) {
      return {
        data: [],
        count: 0,
      }
    }

    return await response.json()
  } catch (error) {
    console.log(error)
    return {
      data: [],
      count: 0,
    }
  }
}
